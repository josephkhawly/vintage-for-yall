"use client";

import {
  AnalyticsEvent,
  trackCartAnalytics,
  type StorefrontAnalytics,
} from "@shopify/hydrogen";

export { AnalyticsEvent, trackCartAnalytics };

let bus: StorefrontAnalytics | null = null;

/** Lazy browser singleton for the ShopifyScripts analytics bus. */
export function getAnalytics(): StorefrontAnalytics | null {
  if (typeof window === "undefined") return null;
  bus ??= window.Shopify?.analytics ?? null;
  return bus;
}
