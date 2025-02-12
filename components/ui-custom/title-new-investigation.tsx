"use client";

import {useSearchParams} from "next/navigation";

import {Title} from "@/components/ui-custom/title";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

export const TitleNewInvestigation = () => {
  const group = useSearchParams().get("group");
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10">
      <Title>
        Nueva investigación de <span className="uppercase">{group}</span>
      </Title>
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
          ) : (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/dashboard/groups/${group}`}
                  className="uppercase"
                >
                  {group}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/dashboard/groups/${group}/investigations`}
                >
                  Investigaciones
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}
          <BreadcrumbItem>
            <BreadcrumbPage>Nueva investigación</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
