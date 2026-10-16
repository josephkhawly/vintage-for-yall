import { createCartComponents } from '@shopify/hydrogen/react'

import type { cartHandlers } from './cart-handlers'

export const {
  CartProvider,
  useCart,
  useSuspenseCart,
  useOptionalCart,
  useCartActions,
  useCartForm,
} = createCartComponents<typeof cartHandlers>()
