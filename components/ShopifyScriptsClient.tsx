"use client";

import {
  ShopifyScripts,
  type ShopifyScriptsProps,
} from "@shopify/hydrogen/react";
import type {
  ShopifyScriptsI18n,
  ShopifyScriptsShop,
} from "@shopify/hydrogen";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { routeTemplates } from "@/lib/route-templates";

type ShopifyScriptsClientProps = {
  shop: ShopifyScriptsShop;
  i18n: ShopifyScriptsI18n;
  routes?: ShopifyScriptsProps["routes"];
};

export function ShopifyScriptsClient({
  shop,
  i18n,
  routes = routeTemplates,
}: ShopifyScriptsClientProps) {
  const router = useRouter();
  const navigate = useCallback(
    (url: string) => {
      router.push(url);
    },
    [router],
  );

  return (
    <ShopifyScripts
      analytics={{ channel: "headless" }}
      consent={{ mode: "default-banner" }}
      i18n={i18n}
      navigate={navigate}
      routes={routes}
      shop={shop}
    />
  );
}
