import "server-only";

import { createCookie } from "@remix-run/cookie";
import type { Session } from "@remix-run/session";
import { createCookieSessionStorage } from "@remix-run/session/cookie-storage";
import type {
  ReadonlyCustomerSessionManager,
  WritableCustomerSessionManager,
} from "@shopify/hydrogen/customer-account";

import { getCustomerAccountSessionSecret } from "./env";

const sessionStorage = createCookieSessionStorage();

function isHttpsRequest(request: Request): boolean {
  const url = new URL(request.url);
  if (url.protocol === "https:") return true;

  const forwardedProto = request.headers.get("x-forwarded-proto");
  return forwardedProto?.split(",")[0]?.trim() === "https";
}

function createSessionCookie(secure: boolean) {
  const name = secure ? "__Host-session" : "__session";

  return createCookie(name, {
    httpOnly: true,
    path: "/",
    sameSite: "Lax",
    secrets: [getCustomerAccountSessionSecret()],
    secure,
  });
}

async function readSessionFromCookieHeader(
  cookieHeader: string | null,
  secure: boolean,
): Promise<{ session: Session; cookie: ReturnType<typeof createCookie> }> {
  const cookie = createSessionCookie(secure);
  const value = await cookie.parse(cookieHeader);
  const session = await sessionStorage.read(value);
  return { session, cookie };
}

/**
 * Cookie-backed WritableCustomerSessionManager for Hydrogen route handlers.
 * Uses a signed `__session` cookie, or `__Host-session` when the request is HTTPS.
 */
export async function createSessionManager(
  request: Request,
): Promise<WritableCustomerSessionManager> {
  const secure = isHttpsRequest(request);
  const { session, cookie } = await readSessionFromCookieHeader(
    request.headers.get("Cookie"),
    secure,
  );
  const origin = new URL(request.url).origin;

  return {
    getSessionOrigin: () => origin,
    getSessionItem: (key) => session.get(key),
    setSessionItem: (key, value) => {
      session.set(key, value);
    },
    removeSessionItem: (key) => {
      session.unset(key);
    },
    commit: async () => {
      const stored = await sessionStorage.save(session);
      if (stored == null) return;

      if (stored === "") {
        return {
          "Set-Cookie": await cookie.serialize("", { maxAge: 0 }),
        };
      }

      return {
        "Set-Cookie": await cookie.serialize(stored),
      };
    },
  };
}

/**
 * Read-only session view for Server Components / layouts.
 * Accepts a Cookie header string (e.g. from `cookies().toString()` or Request).
 */
export async function createReadonlySessionManager(
  cookieHeader: string | null,
  options?: { secure?: boolean },
): Promise<ReadonlyCustomerSessionManager> {
  const secure = options?.secure ?? true;
  const { session } = await readSessionFromCookieHeader(cookieHeader, secure);

  return {
    getSessionItem: (key) => session.get(key),
  };
}

/**
 * Read-only session manager from a Request (tries HTTPS cookie name first).
 */
export async function createReadonlySessionManagerFromRequest(
  request: Request,
): Promise<ReadonlyCustomerSessionManager> {
  const secure = isHttpsRequest(request);
  const cookieHeader = request.headers.get("Cookie");

  // Prefer the cookie name that matches the request scheme.
  const primary = await createReadonlySessionManager(cookieHeader, { secure });
  if ((await primary.getSessionItem("customerAccount")) != null) {
    return primary;
  }

  // Fall back to the alternate name in case scheme detection differs from when the cookie was set.
  return createReadonlySessionManager(cookieHeader, { secure: !secure });
}
