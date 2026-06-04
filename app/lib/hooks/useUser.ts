import { useUserContext } from "@/app/lib/context/UserContext";

export function useUser() {
  const { firstName, subscriptionTier, loading, refreshUser } = useUserContext();
  return { firstName, subscriptionTier, loading, refreshUser };
}