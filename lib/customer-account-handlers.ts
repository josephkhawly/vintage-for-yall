import "server-only";

import { createCustomerAccountServerHandlers } from "@shopify/hydrogen/customer-account";

import { customerSession } from "./customer-session";

export const customerAccountHandlers = createCustomerAccountServerHandlers({
  customerSession,
});
