import {ReactNode} from "react";

import {getUser} from "@/actions/users/get-me";
import {validatePermissions} from "@/helpers/validate-permissions";

const GroupLayout = async ({
  params,
  children
}: {
  params: Promise<{group: string}>;
  children: ReactNode;
}) => {
  const {group} = await params;
  const user = await getUser();

  validatePermissions(user, {
    requiredModules: [group]
  });

  return <>{children}</>;
};

export default GroupLayout;
