"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { AnalyticsEvent, getAnalytics } from "@/lib/analytics";

/** Publishes PAGE_VIEWED on App Router navigations. */
export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageKey = `${pathname}?${searchParams?.toString() ?? ""}`;

  useEffect(() => {
    const analytics = getAnalytics();
    if (!analytics) return;
    analytics.publish(AnalyticsEvent.PAGE_VIEWED);
  }, [pageKey]);

  return null;
}
