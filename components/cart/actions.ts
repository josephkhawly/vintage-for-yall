'use server'

import { TAGS } from '@/lib/constants'
import { addToCart, createCart, getCart, removeFromCart } from '@/lib/shopify'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function addItem(prevState: any, selectedVariantId: string | undefined) {
  let cartId = cookies().get('cartId')?.value

  if (!cartId || !selectedVariantId) {
    return 'Missing cart ID or variant ID'
    // return 'Error adding item to cart'
  }

  try {
    await addToCart(cartId, [{ merchandiseId: selectedVariantId, quantity: 1 }])
    revalidateTag(TAGS.cart)
  } catch (e) {
    console.error(e)
    return 'Error adding item to cart'
  }
}

export async function removeItem(prevState: any, merchandiseId: string) {
  let cartId = cookies().get('cartId')?.value

  if (!cartId) {
    return 'Missing cart ID'
  }

  try {
    const cart = await getCart(cartId)

    if (!cart) {
      return 'Error fetching cart'
    }

    const lineItem = cart.lines.find((line) => line.merchandise.id === merchandiseId)

    if (lineItem && lineItem.id) {
      await removeFromCart(cartId, [lineItem.id])
      revalidateTag(TAGS.cart)
    } else {
      return 'Item not found in cart'
    }
  } catch (e) {
    return 'Error removing item from cart'
  }
}

export async function redirectToCheckout() {
  let cartId = cookies().get('cartId')?.value

  if (!cartId) {
    return 'Missing cart ID'
  }

  let cart = await getCart(cartId)

  if (!cart) {
    return 'Error fetching cart'
  }

  redirect(cart.checkoutUrl)
}

export async function createCartAndSetCookie() {
  let cart = await createCart()
  cookies().set('cartId', cart.id!)
}
