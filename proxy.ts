import { handleShopifyRoutes } from "@shopify/hydrogen";
import { NextResponse, type NextRequest } from "next/server";

import { cartHandlers } from "./lib/cart-handlers";
import { customerAccountHandlers } from "./lib/customer-account-handlers";
import { routeTemplates } from "./lib/route-templates";
import { createSessionManager } from "./lib/session";
import { createStorefrontClientForRequest } from "./lib/storefront";

export async function proxy(request: NextRequest) {
  const storefrontClient = createStorefrontClientForRequest(request);
  const requestContext = storefrontClient.requestContext;
  const sessionManager = await createSessionManager(request);

  const shopifyRoute = handleShopifyRoutes({
    request,
    requestContext,
    sessionManager,
    storefrontClient,
    routeTemplates,
    handlers: [cartHandlers, customerAccountHandlers],
  });
  if (shopifyRoute) return shopifyRoute;

  const requestHeaders = requestContext.getForwardedRequestHeaders();
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  requestContext.applyResponseHeaders(response.headers);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|_next/data|favicon.ico).*)"],
};
