import { redirect } from "next/navigation";

import { getModuleById } from "@/actions/modules/get-module-by-id";
import { EditModuleForm } from "@/components/ui-custom/forms/edit-module-form.tsx";

import { Title } from "@/components/ui-custom/title";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const EditDepartmentPage = async ({
  params,
}: {
  params: { moduleId: string };
}) => {
  const { data } = await getModuleById(Number(params.moduleId));

  if (!data) return redirect("/dashboard/modules");

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10">
        <Title>Editar módulo</Title>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/modules">Módulos</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbPage>Editar módulo</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <EditModuleForm data={data} />
    </div>
  );
};

export default EditDepartmentPage;
