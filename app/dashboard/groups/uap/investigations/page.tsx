import Link from "next/link";

import { getInvestigationsByGroup } from "@/actions/investigations/get-investigations-by-group";

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

import { Button } from "@/components/ui/button";

export default async function InvestigationsPage() {
  const { data } = await getInvestigationsByGroup({ group: "uap" });

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10">
        <Title>Investigaciones UAP</Title>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Investigaciones UAP</BreadcrumbPage>
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
            <Link href="/dashboard/investigations/new?group=uap">
              Nueva investigación
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
