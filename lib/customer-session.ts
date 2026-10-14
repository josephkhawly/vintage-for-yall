import "server-only";

import { createShopifyRequestContext } from "@shopify/hydrogen";
import { createCustomerSession } from "@shopify/hydrogen/customer-account";
import type { ReadonlyCustomerSessionManager } from "@shopify/hydrogen/customer-account";
import { cookies, headers } from "next/headers";

import {
  getCustomerAccountApiClientId,
  getShopId,
} from "./env";
import {
  createReadonlySessionManager,
  createReadonlySessionManagerFromRequest,
} from "./session";

export const customerSession = createCustomerSession({
  shopId: getShopId(),
  customerAccountApiClientId: getCustomerAccountApiClientId() || "not-configured",
});

export {
  createReadonlySessionManager,
  createReadonlySessionManagerFromRequest,
};

export async function getReadonlyCustomerSessionManager(): Promise<ReadonlyCustomerSessionManager> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const hasHostSession = cookieStore.has("__Host-session");

  return createReadonlySessionManager(cookieHeader || null, {
    secure: hasHostSession,
  });
}

export async function isCustomerLoggedIn(): Promise<boolean> {
  const sessionManager = await getReadonlyCustomerSessionManager();
  const requestHeaders = await headers();
  const requestContext = createShopifyRequestContext({
    request: { headers: requestHeaders },
    i18n: { country: "US", language: "EN" },
  });
  return customerSession.isLoggedIn(sessionManager, requestContext);
}
