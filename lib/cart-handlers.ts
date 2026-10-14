import "server-only";

import { createCartServerHandlers } from "@shopify/hydrogen";

/**
 * Cart server handlers registered through `handleShopifyRoutes`.
 *
 * Buyer-identity sync via `customerSession` is intentionally omitted for now:
 * `@shopify/hydrogen/customer-account` has no `development` export condition, so
 * under Next.js Turbopack/dev the core and customer-account bundles are separate
 * module instances with different brand Symbols. Passing `cartServerHandlers`
 * into `createCustomerAccountServerHandlers` then throws even when both were
 * created correctly. Re-enable sync once that export ships a `development`
 * condition (or in production-only wiring).
 */
export const cartHandlers = createCartServerHandlers();
