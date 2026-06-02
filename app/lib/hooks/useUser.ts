import { useUserContext } from "@/app/lib/context/UserContext";

export function useUser() {
  const { firstName, subscriptionTier } = useUserContext();
  return { firstName, subscriptionTier, loading: false };
}