import { useContext } from "react";
import UserContext, { UserContextProps } from "@/providers/user-provider";

export const useUser = () => {
  return useContext(UserContext) as UserContextProps;
};
