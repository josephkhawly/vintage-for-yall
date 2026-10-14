"use client";

import { HiOutlineXMark } from "react-icons/hi2";

import { CartContent } from "@/components/cart/CartLines";
import { useCart } from "@/lib/cart";
import {
  CART_DRAWER_ID,
  closeCartDrawer,
  openCartDrawer,
} from "@/lib/cart-drawer";

function OpenCart({ quantity }: { quantity?: number }) {
  return (
    <div className="flex h-11 items-center gap-2 rounded-full border border-black bg-teal/50 pr-1.5 pl-4 font-subheading text-sm uppercase tracking-wide text-black backdrop-blur-sm md:h-14 md:pr-2 md:pl-5 md:text-base">
      <span>Cart</span>
      <span className="flex size-8 items-center justify-center rounded-full border border-black text-xs md:size-10 md:text-sm">
        {quantity ?? 0}
      </span>
    </div>
  );
}

export function CartTrigger() {
  const totalQuantity = useCart((state) => state.data.totalQuantity);

  return (
    <a
      aria-controls={CART_DRAWER_ID}
      aria-haspopup="dialog"
      aria-label="Open cart"
      className="cursor-pointer"
      href="/cart"
      onClick={(event) => {
        event.preventDefault();
        openCartDrawer();
      }}
    >
      <OpenCart quantity={totalQuantity} />
    </a>
  );
}

export function CartDrawer() {
  return (
    <dialog
      aria-labelledby="cart-drawer-title"
      className="cart-drawer open:flex flex-col border-l border-black bg-teal/50 text-black backdrop-blur-sm"
      closedby="any"
      id={CART_DRAWER_ID}
    >
      <div className="flex shrink-0 items-center justify-between gap-4 p-6 pb-2">
        <h2 className="font-subheading text-xl uppercase tracking-wide" id="cart-drawer-title">
          Cart
        </h2>
        <button
          aria-label="Close cart"
          className="cursor-pointer p-2 text-black"
          onClick={closeCartDrawer}
          type="button"
        >
          <HiOutlineXMark className="size-8" />
        </button>
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-6 pb-6">
        <CartContent variant="drawer" />
      </div>
    </dialog>
  );
}
