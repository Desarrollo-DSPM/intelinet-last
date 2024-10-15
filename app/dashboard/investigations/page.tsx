import { getAllInvestigations } from "@/actions/investigations/get-all-investigations";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

import { Title } from "@/components/ui-custom/title";
import { UserValidation } from "@/components/ui-custom/user-validation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function InvestigationsPage() {
  const { data } = await getAllInvestigations();

  return (
    <div>
      <UserValidation />
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
        <DataTable data={data} columns={columns} />
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
