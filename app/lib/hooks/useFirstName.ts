// app/lib/hooks/useFirstName.ts
import { useEffect, useState } from "react";
import { createClient } from "@/app/lib/supabase";

export function useFirstName() {
  const [firstName, setFirstName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setFirstName(session?.user?.user_metadata?.first_name ?? null);
      setLoading(false);
    });
  }, []);

  return { firstName, loading };
}