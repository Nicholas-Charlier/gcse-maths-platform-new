"use client";

import { createContext, useContext } from "react";

type UserContextType = {
  firstName: string | null;
  subscriptionTier: string | null;
};

const UserContext = createContext<UserContextType>({
  firstName: null,
  subscriptionTier: null,
});

export function UserProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: UserContextType;
}) {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  return useContext(UserContext);
}