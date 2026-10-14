import { handleShopifyRedirects } from "@shopify/hydrogen";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import Link from "next/link";
import { Suspense } from "react";

import { routeTemplates } from "@/lib/route-templates";
import { getStorefrontClient } from "@/lib/storefront";

export default function NotFound() {
  return (
    <div className="container mx-auto px-6 pb-16 pt-16 text-center sm:pt-24">
      <Suspense fallback={null}>
        <RedirectChecker />
      </Suspense>
      <h1 className="font-frogmore text-6xl tracking-wide text-espresso">404</h1>
      <p className="mt-4 font-subheading text-lg text-espresso/80">
        We couldn&apos;t find that page.
      </p>
      <Link
        className="mt-8 inline-flex rounded-full border border-espresso bg-teal/50 px-8 py-3 font-subheading text-sm uppercase tracking-wide text-espresso hover:opacity-90"
        href="/"
      >
        Back home
      </Link>
    </div>
  );
}

async function RedirectChecker() {
  await connection();
  const url = (await headers()).get("x-storefront-url");

  if (url) {
    const result = await handleShopifyRedirects({
      request: new Request(url),
      routeTemplates,
      storefrontClient: await getStorefrontClient(),
    });
    const location = result?.headers.get("location");
    if (location) redirect(location);
  }

  return null;
}
