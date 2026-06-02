// app/lib/hooks/useFirstName.ts
import { useEffect, useState } from "react";
import { createClient } from "@/app/lib/supabase";

export function useFirstName() {
  const [firstName, setFirstName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("first_name")
          .eq("id", user.id)
          .single();
        setFirstName(profile?.first_name ?? null);
      }
      setLoading(false);
    });
  }, []);

  return { firstName, loading };
}