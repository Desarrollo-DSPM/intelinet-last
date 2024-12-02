import { getInvestigationsById } from "@/actions/investigations/get-investigation-by-id";
import { EditInvestigationForm } from "@/components/ui-custom/forms/edit-investigation";
import { Title } from "@/components/ui-custom/title";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { redirect } from "next/navigation";

export default async function InvestigationsPage({
  params,
}: {
  params: { investigationId: string };
}) {
  const { data } = await getInvestigationsById({
    id: Number(params.investigationId),
  });

  if (!data) {
    redirect("/dashboard/admin/investigations");
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10">
        <Title>Editar Investigación</Title>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/admin/investigations">
                Investigaciones
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Editar investigación</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <EditInvestigationForm investigation={data} />
    </div>
  );
}