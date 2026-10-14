import "server-only";

import { createCustomerAccountServerHandlers } from "@shopify/hydrogen/customer-account";

import { cartHandlers } from "./cart-handlers";
import { customerSession } from "./customer-session";

export const customerAccountHandlers = createCustomerAccountServerHandlers({
  customerSession,
  cartServerHandlers: cartHandlers,
});
