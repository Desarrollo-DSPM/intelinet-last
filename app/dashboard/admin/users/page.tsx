import { getAllUsers } from "@/actions/users/get-users";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

import { Title } from "@/components/ui-custom/title";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { validatePermissions } from "@/helpers/validate-permissions";
import { getUser } from "@/actions/users/get-me";

const UsersPage = async () => {
  const user = await getUser();

  validatePermissions(user, {
    requiredRole: "admin",
  });

  const { data } = await getAllUsers();

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10">
        <Title>Usuarios</Title>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Usuarios</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {data.length > 0 ? (
        <DataTable data={data} columns={columns} />
      ) : (
        <p className="text-center my-20 text-muted-foreground">
          No hay usuarios
        </p>
      )}
    </div>
  );
};

export default UsersPage;
