import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "./components/Navbar";
import "./globals.css";
import { createClient } from "@/app/lib/supabase/server";
import { UserProvider } from "@/app/lib/context/UserContext";
import type { SubscriptionTier } from "@/app/lib/context/UserContext";
import { cache } from "react";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const VALID_TIERS = ["free", "monthly", "yearly"] as const;

const getUser = cache(async () => {
  const supabase = await createClient();
  
  // getSession() reads cookie locally — no network call to Supabase Auth
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.user) return { firstName: null, subscriptionTier: null };

  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name, subscription_tier")
    .eq("id", session.user.id)
    .single();

  const raw = profile?.subscription_tier;
  const subscriptionTier: SubscriptionTier = VALID_TIERS.includes(raw)
    ? (raw as SubscriptionTier)
    : "free";

  return {
    firstName: profile?.first_name ?? null,
    subscriptionTier,
  };
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