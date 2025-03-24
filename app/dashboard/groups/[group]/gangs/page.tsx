import {redirect} from "next/navigation";

import {getUser} from "@/actions/users/get-me";
import {Title} from "@/components/ui-custom/title";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import {DataTable} from "./_components/data-table";
import {columns} from "./_components/columns";
import {getAllGangs} from "@/actions/gangs/get-all-gangs";
import {ButtonCreateGang} from "@/components/ui-custom/buttons/button-create-gang";

export default async function GangsPage() {
  const user = await getUser();

  if (user?.role !== "admin" && !user?.modules.includes("uap"))
    redirect("/not-access");

  const {data} = await getAllGangs();

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10">
        <Title className="uppercase">Pandillas</Title>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/dashboard/groups/uap`}
                className="uppercase"
              >
                UAP
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Pandillas</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {data.length > 0 ? (
        <DataTable data={data} columns={columns} />
      ) : (
        <div className="flex flex-col items-center justify-center gap-5 my-20">
          <p className="text-muted-foreground">Aquí aparecerán las pandillas</p>
          <ButtonCreateGang />
        </div>
      )}
    </div>
  );
}
