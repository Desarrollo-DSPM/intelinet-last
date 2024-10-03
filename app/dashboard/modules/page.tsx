import { getAllModules } from "@/actions/modules/get-all-modules";

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
import { ButtonCreateModule } from "@/components/ui-custom/modals/button-create-module";

const ModulesPage = async () => {
  const { data } = await getAllModules();

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10">
        <Title>Módulos</Title>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Módulos</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {data.length > 0 ? (
        <DataTable data={data} columns={columns} />
      ) : (
        <div className="flex flex-col items-center gap-5">
          <p className="text-center text-muted-foreground">No hay módulos</p>
          <ButtonCreateModule />
        </div>
      )}
    </div>
  );
};

export default ModulesPage;
