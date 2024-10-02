"use client";

import { ReactNode, useEffect } from "react";
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
import { getUserById } from "@/actions/get-user";
import { useParams, usePathname } from "next/navigation";
import { useUser } from "@/hooks/use-user";

const UserDetailsLayout = ({ children }: { children: ReactNode }) => {
  const { user, setUser } = useUser();
  const params = useParams();
  const pathname = usePathname();

  useEffect(() => {
    (async () => {
      const { data } = await getUserById(Number(params.userId));
      setUser(data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.userId]);

  if (!user) return null;

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10">
        <Title>
          {pathname === `/dashboard/users/${user?.id}`
            ? "Información"
            : "Roles y permisos"}
        </Title>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/users">Usuarios</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{user?.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <NavUserDetails />
      {children}
    </div>
  );
};

export default UserDetailsLayout;
