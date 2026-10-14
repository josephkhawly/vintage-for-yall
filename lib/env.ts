import "server-only";

const DEFAULT_SHOP_ID = "24967512161";
const DEFAULT_STOREFRONT_ID = "0";

function readEnv(name: string): string | undefined {
  const value = process.env[name];
  if (value == null || value === "") return undefined;
  return value;
}

export function getPublicStoreDomain(): string {
  const domain =
    readEnv("PUBLIC_STORE_DOMAIN") ?? readEnv("SHOPIFY_STORE_DOMAIN");
  if (!domain) {
    throw new Error(
      "PUBLIC_STORE_DOMAIN (or SHOPIFY_STORE_DOMAIN) is required",
    );
  }
  return domain;
}

export function getPublicStorefrontApiToken(): string | undefined {
  return (
    readEnv("PUBLIC_STOREFRONT_API_TOKEN") ??
    readEnv("SHOPIFY_PUBLIC_ACCESS_TOKEN")
  );
}

export function getPrivateStorefrontApiToken(): string | undefined {
  return (
    readEnv("PRIVATE_STOREFRONT_API_TOKEN") ??
    readEnv("SHOPIFY_PRIVATE_ACCESS_TOKEN")
  );
}

export function getPublicStorefrontId(): string {
  return readEnv("PUBLIC_STOREFRONT_ID") ?? DEFAULT_STOREFRONT_ID;
}

export function getShopId(): string {
  return readEnv("SHOP_ID") ?? DEFAULT_SHOP_ID;
}

export function getCustomerAccountApiClientId(): string | undefined {
  return readEnv("PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID");
}

export function getCustomerAccountSessionSecret(): string {
  const configured = readEnv("CUSTOMER_ACCOUNT_SESSION_SECRET");
  if (configured) return configured;

  const domain =
    readEnv("PUBLIC_STORE_DOMAIN") ??
    readEnv("SHOPIFY_STORE_DOMAIN") ??
    "local";
  return `local-dev-${domain}-session-secret`;
}
