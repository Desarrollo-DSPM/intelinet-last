"use client";

import { useState, createContext, ReactNode, useEffect, use } from "react";
import { redirect, usePathname } from "next/navigation";

import { User } from "@/lib/db/schema";

export interface AuthContextProps {
  auth: User | null;
  setAuth: (user: User | null) => void;
  isOpenMenu: boolean;
  setIsOpenMenu: (isOpen: boolean) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider = ({
  children,
  userPromise,
}: {
  children: ReactNode;
  userPromise: Promise<User | null>;
}) => {
  const initialUser = use(userPromise);
  const [auth, setAuth] = useState<User | null>(initialUser);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const pathname = usePathname();

  useEffect(() => {
    const adminRoutes = ["/dashboard/users"];
    setAuth(initialUser);

    // Rutas protegidas
    if (auth?.role !== "admin") {
      if (adminRoutes.some((route) => pathname.startsWith(route))) {
        redirect("/dashboard");
      }
    }
  }, [initialUser, auth, pathname]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        isOpenMenu,
        setIsOpenMenu,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
