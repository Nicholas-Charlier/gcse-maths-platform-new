import { useUserContext } from "@/app/lib/context/UserContext";

export function useFirstName() {
  const { firstName } = useUserContext();
  return { firstName, loading: false };
}