import { handleShopifyRedirects } from "@shopify/hydrogen";
import { NextResponse } from "next/server";

import { routeTemplates } from "@/lib/route-templates";
import { createStorefrontClientForRequest } from "@/lib/storefront";

/** Hard HTTP redirect to Shopify Admin (avoids soft 404 + RSC redirect). */
export async function GET(request: Request) {
  const storefrontClient = createStorefrontClientForRequest(request);
  const redirect = await handleShopifyRedirects({
    request,
    storefrontClient,
    routeTemplates,
  });

  if (redirect) return redirect;

  return NextResponse.redirect(new URL("/", request.url), 307);
}
