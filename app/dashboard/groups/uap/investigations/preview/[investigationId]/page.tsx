import { getInvestigationsById } from "@/actions/investigations/get-investigation-by-id";
import { InvestigationDocument } from "@/components/ui-custom/investigation-document";
import { redirect } from "next/navigation";

import { Title } from "@/components/ui-custom/title";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const InvestigationPDFId = async ({
  params,
}: {
  params: { investigationId: string };
}) => {
  const { data } = await getInvestigationsById({
    id: Number(params.investigationId),
  });

  if (!data) return redirect("/dashboard/groups/uap/investigations");

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10">
        <Title>Vista previa</Title>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/groups/uap/investigations">
                Investigaciones
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Vista previa</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <InvestigationDocument
        data={data}
        className="max-w-2xl shadow-md mx-auto p-4 border border-border rounded-lg"
      />
    </>
  );
};

export default InvestigationPDFId;
