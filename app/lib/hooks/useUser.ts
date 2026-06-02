import { useEffect, useState } from "react";
import { createClient } from "@/app/lib/supabase";

export function useUser() {
  const [firstName, setFirstName] = useState<string | null>(null);
  const [subscriptionTier, setSubscriptionTier] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const user = session?.user;
      if (user) {
        setFirstName(user.user_metadata?.first_name ?? null);

        const { data: profile } = await supabase
          .from("profiles")
          .select("subscription_tier")
          .eq("id", user.id)
          .single();

        setSubscriptionTier(profile?.subscription_tier ?? "free");
      }

      setLoading(false);
    });
  }, []);

  return { firstName, subscriptionTier, loading };
}