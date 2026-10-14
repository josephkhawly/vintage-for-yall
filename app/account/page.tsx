import {
  createCustomerAccountClient,
  gql,
} from "@shopify/hydrogen/customer-account";
import type { Metadata } from "next";
import { connection } from "next/server";
import { redirect } from "next/navigation";

import {
  customerSession,
  getReadonlyCustomerSessionManager,
} from "@/lib/customer-session";
import { getShopId } from "@/lib/env";
import { getStorefrontClient } from "@/lib/storefront";

export const metadata: Metadata = {
  title: "Account | Ugly Cry Vintage",
  description: "Your Ugly Cry Vintage account",
};

const CUSTOMER_QUERY = gql(`
  query CurrentCustomer {
    customer {
      firstName
      lastName
      emailAddress {
        emailAddress
      }
    }
  }
`);

type AccountPageProps = {
  searchParams: Promise<{ refreshed?: string }>;
};

export default async function AccountPage({ searchParams }: AccountPageProps) {
  await connection();

  const params = await searchParams;
  const sessionManager = await getReadonlyCustomerSessionManager();
  const storefrontClient = await getStorefrontClient();
  const { requestContext } = storefrontClient;

  const loggedIn = await customerSession.isLoggedIn(
    sessionManager,
    requestContext,
  );

  if (!loggedIn) {
    return <SignedOutPanel />;
  }

  const accessToken = await customerSession.getAccessToken(
    sessionManager,
    requestContext,
  );

  if (!accessToken) {
    if (params.refreshed === "1") {
      return (
        <AccountShell>
          <p className="text-espresso/80">
            We couldn&apos;t refresh your session.{" "}
            <a className="underline" href="/account/login?return_to=/account">
              Sign in again
            </a>
            .
          </p>
        </AccountShell>
      );
    }
    redirect("/account/refresh?return_to=/account?refreshed=1");
  }

  try {
    const customerAccount = createCustomerAccountClient({
      shopId: getShopId(),
      requestContext,
    });
    const result = await customerAccount.graphql(CUSTOMER_QUERY, {
      accessToken,
    });

    if (result.errors?.length) {
      return (
        <AccountShell>
          <p className="text-espresso/80" role="alert">
            We couldn&apos;t load your account details. Please try again later.
          </p>
          <LogoutForm />
        </AccountShell>
      );
    }

    const customer = result.data?.customer;
    const name = [customer?.firstName, customer?.lastName]
      .filter(Boolean)
      .join(" ");
    const email = customer?.emailAddress?.emailAddress;

    return (
      <AccountShell>
        <p className="font-subheading text-lg text-espresso">
          {name || "Welcome back"}
        </p>
        {email ? <p className="mt-2 text-espresso/80">{email}</p> : null}
        <div className="mt-8">
          <LogoutForm />
        </div>
      </AccountShell>
    );
  } catch {
    return (
      <AccountShell>
        <p className="text-espresso/80" role="alert">
          We couldn&apos;t load your account details. Please try again later.
        </p>
        <LogoutForm />
      </AccountShell>
    );
  }
}

function AccountShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto max-w-xl px-6 pb-16 pt-16 sm:pt-24">
      <h1 className="mb-8 font-frogmore text-5xl tracking-wide text-espresso md:text-6xl">
        Account
      </h1>
      {children}
    </div>
  );
}

function SignedOutPanel() {
  return (
    <AccountShell>
      <p className="mb-6 text-espresso/80">
        Sign in to view your account details.
      </p>
      <a
        className="inline-flex rounded-full border border-espresso bg-sandy-clay px-8 py-3 font-subheading text-sm uppercase tracking-wide text-espresso hover:opacity-90"
        href="/account/login?return_to=/account"
      >
        Sign in
      </a>
      <p className="mt-6 text-sm text-espresso/60">
        Customer Account login requires HTTPS (including locally). Use a
        public HTTPS tunnel or deploy a preview URL to complete OAuth.
      </p>
    </AccountShell>
  );
}

function LogoutForm() {
  return (
    <form action="/account/logout" method="post">
      <button
        className="rounded-full border border-espresso px-8 py-3 font-subheading text-sm uppercase tracking-wide text-espresso hover:bg-teal/30"
        type="submit"
      >
        Log out
      </button>
    </form>
  );
}
