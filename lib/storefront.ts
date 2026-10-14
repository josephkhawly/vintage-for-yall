import "server-only";

import {
  createShopifyRequestContext,
  createStorefrontClient,
} from "@shopify/hydrogen";
import { headers } from "next/headers";
import { cache } from "react";

import {
  getPrivateStorefrontApiToken,
  getPublicStoreDomain,
  getPublicStorefrontApiToken,
  getPublicStorefrontId,
} from "./env";

const DEFAULT_I18N = { country: "US", language: "EN" } as const;

export function getBuyerIp(headersList: Headers): string {
  for (const header of [
    "x-forwarded-for",
    "oxygen-buyer-ip",
    "cf-connecting-ip",
  ] as const) {
    const raw = headersList.get(header);
    const ip = raw?.split(",")[0]?.trim();
    if (ip) return ip;
  }

  if (process.env.NODE_ENV !== "production") {
    return "127.0.0.1";
  }

  throw new Error(
    "No buyer IP header on the request (x-forwarded-for, oxygen-buyer-ip, or cf-connecting-ip)",
  );
}

function createStorefrontClientFromParts(
  request: Request | { headers: Headers },
  buyerIp: string | undefined,
) {
  const storeDomain = getPublicStoreDomain();
  const storefrontId = getPublicStorefrontId();
  const privateToken = getPrivateStorefrontApiToken();

  if (privateToken) {
    if (!buyerIp) {
      throw new Error("buyerIp is required for private Storefront API clients");
    }

    const requestContext = createShopifyRequestContext({
      request,
      i18n: DEFAULT_I18N,
      buyerIp,
    });

    return createStorefrontClient({
      type: "private",
      requestContext,
      config: {
        storeDomain,
        privateStorefrontToken: privateToken,
        storefrontId,
      },
    });
  }

  const requestContext = createShopifyRequestContext({
    request,
    i18n: DEFAULT_I18N,
  });

  return createStorefrontClient({
    type: "public",
    requestContext,
    config: {
      storeDomain,
      publicStorefrontToken: getPublicStorefrontApiToken(),
      storefrontId,
    },
  });
}

export const getStorefrontClient = cache(async () => {
  const requestHeaders = await headers();
  const privateToken = getPrivateStorefrontApiToken();
  const buyerIp = privateToken ? getBuyerIp(requestHeaders) : undefined;

  return createStorefrontClientFromParts(
    { headers: requestHeaders },
    buyerIp,
  );
});

export function createStorefrontClientForRequest(request: Request) {
  const privateToken = getPrivateStorefrontApiToken();
  const buyerIp = privateToken ? getBuyerIp(request.headers) : undefined;

  return createStorefrontClientFromParts(request, buyerIp);
}
