"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { createClient } from "@/app/lib/supabase";

export type SubscriptionTier = "free" | "monthly" | "yearly";

type UserContextType = {
  firstName: string | null;
  subscriptionTier: SubscriptionTier | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
};

const VALID_TIERS = ["free", "monthly", "yearly"] as const;

const UserContext = createContext<UserContextType>({
  firstName: null,
  subscriptionTier: null,
  loading: true,
  refreshUser: async () => {},
});

export function UserProvider({
  children,
  initialFirstName,
  initialSubscriptionTier,
}: {
  children: React.ReactNode;
  initialFirstName: string | null;
  initialSubscriptionTier: SubscriptionTier | null;
}) {
  const [firstName, setFirstName] = useState<string | null>(initialFirstName);
  const [subscriptionTier, setSubscriptionTier] = useState<SubscriptionTier | null>(initialSubscriptionTier);
  const [loading, setLoading] = useState(false);

  const refreshUser = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setFirstName(null);
      setSubscriptionTier(null);
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("first_name, subscription_tier")
      .eq("id", user.id)
      .single();

    const raw = profile?.subscription_tier;
    const tier: SubscriptionTier = VALID_TIERS.includes(raw)
      ? (raw as SubscriptionTier)
      : "free";

    setFirstName(profile?.first_name ?? null);
    setSubscriptionTier(tier);
    setLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ firstName, subscriptionTier, loading, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}