import { redirect } from "next/navigation";

import { getDepartmentById } from "@/actions/departments/get-department";
import { EditDepartmentForm } from "@/components/ui-custom/forms/edit-department-form";
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
  params: { departmentId: string };
}) => {
  const { data } = await getDepartmentById(Number(params.departmentId));

  if (!data) return redirect("/dashboard/admin/departments");

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10">
        <Title>Editar departamento</Title>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/admin/departments">
                Departamentos
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbPage>Departamentos</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <EditDepartmentForm department={data} />
    </div>
  );
};

export default EditDepartmentPage;
