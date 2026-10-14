import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Kameron, Roboto } from "next/font/google";
import localFont from "next/font/local";
import { Suspense } from "react";

import { ShopifyScriptsClient } from "@/components/ShopifyScriptsClient";
import { routeTemplates } from "@/lib/route-templates";
import { getShopifyScriptsI18n, getShopifyScriptsShop } from "@/lib/shop";

import { AppShell } from "./app-shell";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-roboto",
});

const frogmore = localFont({
  src: "../public/ED-Frogmore-Regular.otf",
  display: "swap",
  variable: "--font-frogmore",
});

const kameron = Kameron({
  weight: ["400"],
  subsets: ["latin"],
  style: ["normal"],
  variable: "--font-kameron",
});

export const metadata: Metadata = {
  title: "Ugly Cry Vintage",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const shop = getShopifyScriptsShop();
  const i18n = getShopifyScriptsI18n();

  return (
    <html className="overflow-x-clip" lang="en">
      <body
        className={`${roboto.variable} ${kameron.variable} ${frogmore.variable} overflow-x-clip font-body text-espresso`}
      >
        <ShopifyScriptsClient i18n={i18n} routes={routeTemplates} shop={shop} />
        <Suspense fallback={null}>
          <AppShell>{children}</AppShell>
        </Suspense>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
