"use client";

import { useCartAnalytics } from "@shopify/hydrogen/react";
import { useEffect, useState, type ReactNode } from "react";

import { CartProvider } from "@/lib/cart";
import type { cartHandlers } from "@/lib/cart-handlers";

type CartData = Awaited<ReturnType<typeof cartHandlers.get>>["data"];

function CartAnalyticsInner() {
  useCartAnalytics();
  return null;
}

function CartAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const enableIfReady = () => {
      if (window.Shopify?.analytics) {
        setEnabled(true);
        return true;
      }
      return false;
    };

    if (enableIfReady()) return;

    const interval = window.setInterval(() => {
      if (enableIfReady()) window.clearInterval(interval);
    }, 200);

    const timeout = window.setTimeout(() => window.clearInterval(interval), 10_000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, []);

  if (!enabled) return null;
  return <CartAnalyticsInner />;
}

export function Providers({
  cartData,
  children,
}: {
  cartData: Promise<CartData>;
  children: ReactNode;
}) {
  return (
    <CartProvider initialData={cartData}>
      <CartAnalytics />
      {children}
    </CartProvider>
  );
}
