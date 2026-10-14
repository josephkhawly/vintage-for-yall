import type { Metadata } from "next";
import Link from "next/link";

import { CartContent } from "@/components/cart/CartLines";

export const metadata: Metadata = {
  title: "Cart | Ugly Cry Vintage",
  description: "Your shopping cart",
};

export default function CartPage() {
  return (
    <div className="container mx-auto max-w-3xl px-6 pb-16 pt-16 sm:pt-24">
      <div className="mb-8 flex items-end justify-between gap-4">
        <h1 className="font-frogmore text-5xl tracking-wide text-espresso md:text-6xl">
          Cart
        </h1>
        <Link
          className="font-subheading text-sm uppercase tracking-wide underline"
          href="/shop"
        >
          Continue shopping
        </Link>
      </div>
      <CartContent variant="page" />
    </div>
  );
}
