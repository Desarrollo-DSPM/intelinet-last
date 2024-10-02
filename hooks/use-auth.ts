import { useContext } from "react";
import AuthContext, { AuthContextProps } from "@/providers/auth-provider";

export const useAuth = () => {
  return useContext(AuthContext) as AuthContextProps;
};
