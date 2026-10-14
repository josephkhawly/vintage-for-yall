import "server-only";

import { createCartServerHandlers } from "@shopify/hydrogen";

import { customerSession } from "./customer-session";

export const cartHandlers = createCartServerHandlers({ customerSession });
