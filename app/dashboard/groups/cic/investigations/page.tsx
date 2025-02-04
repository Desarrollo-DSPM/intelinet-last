import Link from "next/link";

import { getInvestigationsByGroup } from "@/actions/investigations/get-investigations-by-group";

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
import { RenderDataTable } from "@/components/ui-custom/data-table-investigations/render-data-table";

export default async function InvestigationsPage() {
  const group = "cic";
  const { data } = await getInvestigationsByGroup({ group });

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10">
        <Title>Investigaciones CIC</Title>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Investigaciones CIC</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {data.length > 0 ? (
        <RenderDataTable data={data} group={group} />
      ) : (
        <div className="mt-20 flex flex-col items-center gap-3">
          <p className="text-center text-muted-foreground">
            No hay investigaciones
          </p>
          <Button asChild>
            <Link href="/dashboard/investigations/new?group=cic">
              Nueva investigación
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
