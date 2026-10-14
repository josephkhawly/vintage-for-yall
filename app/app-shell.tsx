import { connection } from "next/server";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { NewsletterModal } from "@/components/NewsletterModal";
import { CartDrawer } from "@/components/cart/CartModal";
import { cartHandlers } from "@/lib/cart-handlers";
import { getReadonlyCustomerSessionManager } from "@/lib/customer-session";
import { getStorefrontClient } from "@/lib/storefront";

import { Providers } from "./providers";

export async function AppShell({ children }: { children: React.ReactNode }) {
  await connection();

  const cartData = getStorefrontClient().then(async (storefrontClient) => {
    const sessionManager = await getReadonlyCustomerSessionManager();
    const { data } = await cartHandlers.get({
      storefrontClient,
      sessionManager,
      requestContext: storefrontClient.requestContext,
    });
    return data;
  });

  return (
    <Providers cartData={cartData}>
      <Header />
      <main className="min-h-svh">{children}</main>
      <Footer />
      <NewsletterModal />
      <CartDrawer />
    </Providers>
  );
}
