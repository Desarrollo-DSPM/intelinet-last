import { ReactNode } from "react";

import { getUserById } from "@/actions/users/get-user";

import { NavUserDetails } from "@/components/ui-custom/nav-user-details";
import { Title } from "@/components/ui-custom/title";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getUser } from "@/actions/users/get-me";
import { validatePermissions } from "@/helpers/validate-permissions";

const UserDetailsLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: { userId: string };
}) => {
  const user = await getUser();

  validatePermissions(user, {
    requiredRole: "admin",
  });

  const { data } = await getUserById(Number(params.userId));

  if (!data) return null;

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10">
        <Title>Editar usuario</Title>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/admin/users">
                Usuarios
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{data?.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <NavUserDetails data={data} />
      {children}
    </div>
  );
};

export default UserDetailsLayout;
