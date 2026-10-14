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

export function getShopifyScriptsShop(): ShopifyScriptsShop {
  return {
    shopId: getShopId(),
    storefrontId: getPublicStorefrontId(),
    myshopifyDomain: getPublicStoreDomain(),
  };
}

export function getShopifyScriptsI18n(): ShopifyScriptsI18n {
  return {
    country: "US",
    language: "EN",
  };
}
