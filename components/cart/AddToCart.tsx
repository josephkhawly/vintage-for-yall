"use client";

import clsx from "clsx";

import { useProduct } from "@/components/ProductContext";
import { useCartForm } from "@/lib/cart";
import { openCartDrawer } from "@/lib/cart-drawer";
import type { Product, ProductVariant } from "@/lib/shopify/types";

function SubmitButton({
  availableForSale,
  selectedVariantId,
  register,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  register: ReturnType<typeof useCartForm>["register"];
}) {
  const buttonClasses =
    "relative mx-auto flex w-full cursor-pointer items-center justify-center rounded-md bg-teal p-4 text-md tracking-wide text-white md:w-1/2";
  const disabledClasses = "cursor-not-allowed opacity-60 hover:opacity-60";

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)} type="button">
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)} type="button">
        Add To Cart
      </button>
    );
  }

  return (
    <button
      aria-label="Add to cart"
      className={clsx(buttonClasses, "hover:opacity-90")}
      type="submit"
      {...register("add")}
    >
      Add To Cart
    </button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { state } = useProduct();
  const { formProps, register } = useCartForm();

  const variant = variants.find((candidate: ProductVariant) =>
    candidate.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()],
    ),
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;

  return (
    <form
      {...formProps({
        beforeSubmit: (event) => {
          if (!selectedVariantId) {
            event.preventDefault();
          }
        },
        afterSubmit: () => {
          openCartDrawer();
          void window.Shopify?.actions?.openCart?.();
        },
      })}
    >
      <input
        type="hidden"
        {...register("merchandiseId", { value: selectedVariantId ?? "" })}
      />
      <input type="hidden" {...register("quantity", { value: 1 })} />
      <SubmitButton
        availableForSale={availableForSale}
        register={register}
        selectedVariantId={selectedVariantId}
      />
    </form>
  );
}
