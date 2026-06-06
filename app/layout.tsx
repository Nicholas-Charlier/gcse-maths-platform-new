import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "./components/Navbar";
import "./globals.css";
import { UserProvider } from "@/app/lib/context/UserContext";
import type { SubscriptionTier } from "@/app/lib/context/UserContext";
import { cache } from "react";
import { headers } from "next/headers";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const VALID_TIERS = ["free", "monthly", "yearly"] as const;

const getUser = cache(async () => {
  const headersList = await headers();
  const userId = headersList.get("x-user-id");

  if (!userId) return { firstName: null, subscriptionTier: null };

  const firstName = headersList.get("x-user-first-name") || null;
  const raw = headersList.get("x-user-subscription-tier");
  const subscriptionTier: SubscriptionTier = VALID_TIERS.includes(raw as SubscriptionTier)
    ? (raw as SubscriptionTier)
    : "free";

  return { firstName, subscriptionTier };
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { firstName, subscriptionTier } = await getUser();

  return (
    <html lang="en" className={jakarta.className}>
      <body>
        <UserProvider
          initialFirstName={firstName}
          initialSubscriptionTier={subscriptionTier}
        >
          <Navbar />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}