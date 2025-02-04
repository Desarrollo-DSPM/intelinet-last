import Link from "next/link";

import { getAllInvestigations } from "@/actions/investigations/get-all-investigations";

import { Title } from "@/components/ui-custom/title";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Button } from "@/components/ui/button";
import { getUser } from "@/actions/users/get-me";
import { validatePermissions } from "@/helpers/validate-permissions";
import { RenderDataTable } from "@/components/ui-custom/data-table-investigations/render-data-table";

export default async function InvestigationsPage() {
  const user = await getUser();

  validatePermissions(user, {
    requiredRole: "admin",
  });

  const { data } = await getAllInvestigations();

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10">
        <Title>Investigaciones</Title>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Investigaciones</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {data.length > 0 ? (
        <RenderDataTable data={data} group="admin" />
      ) : (
        <div className="mt-20 flex flex-col items-center gap-3">
          <p className="text-center text-muted-foreground">
            No hay investigaciones
          </p>
          <Button asChild>
            <Link href="/dashboard/investigations/new">
              Nueva investigación
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
