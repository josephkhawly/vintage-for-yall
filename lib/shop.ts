import "server-only";

import type {
  ShopifyScriptsI18n,
  ShopifyScriptsShop,
} from "@shopify/hydrogen";

import {
  getPublicStoreDomain,
  getPublicStorefrontId,
  getShopId,
} from "./env";

/** Shop identifiers for ShopifyScripts / analytics (server-only). */
export function getShopifyScriptsShop(): ShopifyScriptsShop {
  return {
    shopId: getShopId(),
    storefrontId: getPublicStorefrontId(),
    myshopifyDomain: getPublicStoreDomain(),
  };
}

/** Default US/EN market for ShopifyScripts (server-only). */
export function getShopifyScriptsI18n(): ShopifyScriptsI18n {
  return {
    country: "US",
    language: "EN",
  };
}
