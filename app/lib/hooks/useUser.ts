import { useEffect, useState } from "react";
import { createClient } from "@/app/lib/supabase";

export function useUser() {
  const [firstName, setFirstName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setFirstName(user.user_metadata?.first_name ?? null);
      setLoading(false);
    });
  }, []);

  return { firstName, loading };
}