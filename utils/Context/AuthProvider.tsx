import { ChefUser, User } from "@/services/types/general";
import React, { FC, SetStateAction, createContext, useState } from "react";

interface UserContext {
  user: null | ChefUser;
  setUser: (user: SetStateAction<ChefUser | null>) => void;
}

export const AuthContext = createContext<UserContext>({ user: null, setUser: (user) => {} });

export interface ProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: FC<ProviderProps> = ({ children }) => {
  const [user, setUser] = useState<null | ChefUser>(null);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
