"use client";

import { useSearchParams } from "next/navigation";

import { Title } from "@/components/ui-custom/title";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const TitleNewInvestigation = () => {
  const group = useSearchParams().get("group");
  let title = "Nueva investigación";

  switch (group) {
    case "uap":
      title = "Nueva investigación UAP";
      break;

    default:
      title = "Nueva investigación";
      break;
  }
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10">
      <Title>{title}</Title>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Inicio</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {!group ? (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/investigations">
                  Investigaciones
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          ) : group === "uap" ? (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/groups/uap">
                  UAP
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/groups/uap/investigations">
                  Investigaciones
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          ) : null}
          <BreadcrumbItem>
            <BreadcrumbPage>Nueva investigación</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
