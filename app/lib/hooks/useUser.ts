import { useEffect, useState } from "react";
import { createClient } from "@/app/lib/supabase";

export function useUser() {
  const [firstName, setFirstName] = useState<string | null>(null);
  const [subscriptionTier, setSubscriptionTier] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(async ({ data: { user } }) => {
      console.log('useUser - user:', user)
      if (user) {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("first_name, subscription_tier")
          .eq("id", user.id)
          .single();

        console.log('useUser - profile:', profile)
        console.log('useUser - error:', error)

        setFirstName(profile?.first_name ?? null);
        setSubscriptionTier(profile?.subscription_tier ?? "free");
      }

      setLoading(false);
    });
  }, []);

  return { firstName, subscriptionTier, loading };
}