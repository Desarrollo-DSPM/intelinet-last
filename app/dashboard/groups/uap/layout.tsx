import { ReactNode } from "react";

import { getUser } from "@/actions/users/get-me";
import { validatePermissions } from "@/helpers/validate-permissions";

const UapLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getUser();

  validatePermissions(user, {
    requiredModules: ["uap"],
  });

  return <>{children}</>;
};

export default UapLayout;
