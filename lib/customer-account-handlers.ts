import "server-only";

import { createCustomerAccountServerHandlers } from "@shopify/hydrogen/customer-account";

import { customerSession } from "./customer-session";

/**
 * Customer Account OAuth handlers.
 * Cart buyer-identity sync is omitted — see note in `lib/cart-handlers.ts`.
 */
export const customerAccountHandlers = createCustomerAccountServerHandlers({
  customerSession,
});
