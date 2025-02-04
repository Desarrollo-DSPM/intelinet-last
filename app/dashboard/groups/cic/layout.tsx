import { ReactNode } from "react";

import { getUser } from "@/actions/users/get-me";
import { validatePermissions } from "@/helpers/validate-permissions";

const CicLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getUser();

  validatePermissions(user, {
    requiredModules: ["cic"],
  });

  return <>{children}</>;
};

export default CicLayout;
