import { useUserContext } from "@/app/lib/context/UserContext";

export function useFirstName() {
  const { firstName, loading } = useUserContext();
  return { firstName, loading };
}