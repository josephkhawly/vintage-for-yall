import "server-only";

import { createCartServerHandlers } from "@shopify/hydrogen";

// Buyer-identity sync omitted: under Turbopack, hydrogen core and
// customer-account resolve as separate module instances (different brand Symbols).
export const cartHandlers = createCartServerHandlers();
