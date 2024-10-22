"use client";

import { useState, createContext, ReactNode, useEffect, use } from "react";
import { redirect, usePathname } from "next/navigation";

import { User } from "@/lib/db/schema";
import { LoaderComponent } from "@/components/ui-custom/loader";

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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const pathname = usePathname();

  useEffect(() => {
    setAuth(initialUser);

    // const adminRoutes = ["/dashboard/admin"];

    // Rutas protegidas para admin
    if (auth?.role !== "admin") {
      if (pathname.startsWith("/dashboard/groups/uap")) {
        if (!auth?.modules.includes("uap")) {
          redirect("/dashboard/not-access");
        }
      } else if (pathname.startsWith("/dashboard/investigations/new")) {
        if (!auth?.modules.includes("uap")) {
          redirect("/dashboard/not-access");
        }
      } else {
        // if (adminRoutes.some((route) => pathname.startsWith(route))) {
        //   redirect("/dashboard/not-access");
        // }
        if (pathname.startsWith("/dashboard/admin")) {
          redirect("/dashboard/not-access");
        }
      }
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [initialUser, auth, pathname]);

  if (isLoading) {
    return <LoaderComponent />;
  }

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
