// app/lib/hooks/useFirstName.ts
import { useEffect, useState } from "react";
import { createClient } from "@/app/lib/supabase";

let cache: { firstName: string | null } | null = null;

export function useFirstName() {
  const [firstName, setFirstName] = useState<string | null>(cache?.firstName ?? null);
  const [loading, setLoading] = useState(cache === null);

  useEffect(() => {
    if (cache !== null) return;

    const supabase = createClient();
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("first_name")
          .eq("id", session.user.id)
          .single();
        cache = { firstName: profile?.first_name ?? null };
      } else {
        cache = { firstName: null };
      }
      setFirstName(cache.firstName);
      setLoading(false);
    });
  }, []);

  return { firstName, loading };
}