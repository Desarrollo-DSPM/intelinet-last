"use client";

import { Title } from "@/components/ui-custom/title";

import { InvestigationWithDetails } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { dateFormat } from "@/helpers/dates";

interface InvestigationDocumentProps {
  data: InvestigationWithDetails;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
}

export const InvestigationDocument = ({
  data,
  contentRef,
  className,
}: InvestigationDocumentProps) => {
  // Convertir los folios de la llamada a un array
  const callFolios = data.investigation.callFolios
    ? JSON.parse(data.investigation.callFolios)
    : [];

  // Convertir los folios de los IPH a un array
  const iphFolios = data.investigation.iphFolios
    ? JSON.parse(data.investigation.iphFolios)
    : [];
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10">
        <Title>Investigaciones UAP</Title>
      </div>
      <div
        id="investigationPdf"
        ref={contentRef}
        className={cn(
          "aspect-[210/297] h-fit w-full bg-white text-black",
          className
        )}
      >
        <div className="flex items-center justify-between">
          <img
            src="/images/logo-dspm.webp"
            alt="DSPM"
            className="w-[200px] h-auto object-scale-down"
          />
          <h1 className="font-bold uppercase text-lg">
            Grupos especiales de investigación
          </h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="col-span-2 bg-[#F5F5F5] p-2">
            <h3 className="uppercase flex items-center gap-2 font-bold">
              Nombre del elemento:{" "}
              <p className="font-normal normal-case">
                {data.createdBy.name} {data.createdBy.lastname}
              </p>
            </h3>
          </div>
          <div className="bg-[#F5F5F5] p-2">
            <h3 className="uppercase flex items-center gap-2 font-bold">
              Grupo: <p className="font-normal">{data.investigation.group}</p>
            </h3>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="col-span-2 bg-[#F5F5F5] p-2">
            <h3 className="uppercase flex items-center gap-2 font-bold">
              Nombre del elemento que brinda apoyo:{" "}
              <p className="font-normal normal-case">
                {data.supportBy
                  ? `${data.supportBy.name} ${data.supportBy.lastname}`
                  : ""}
              </p>
            </h3>
          </div>
          <div className="bg-[#F5F5F5] p-2">
            <h3 className="uppercase flex items-center gap-2 font-bold">
              Distrito:{" "}
              <p className="font-normal capitalize">
                {data.investigation.district}
              </p>
            </h3>
          </div>
        </div>
        <div className="py-1 bg-blue-950 my-5">
          <h4 className="text-white uppercase text-center font-bold">
            Modo del inicio de la investigación
          </h4>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="uppercase flex items-center gap-2 font-bold">
              Tipo de evento:
            </h3>
            <p className="capitalize">{data.investigationType?.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <h3 className="uppercase flex items-center gap-2 font-bold">
              Fecha de evento:
            </h3>
            <p className="capitalize">
              {dateFormat(data.investigation.investigationDate)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <h3 className="uppercase flex items-center gap-2 font-bold">
              Ubicación:
            </h3>
            <p className="capitalize">{data.investigation.location}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="uppercase flex items-center gap-2 font-bold">
                Víctima física:
              </h3>
              <p className="capitalize">{data.investigation.physicalVictim}</p>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="uppercase flex items-center gap-2 font-bold">
                Víctima Moral:
              </h3>
              <p className="capitalize">{data.investigation.moralVictim}</p>
            </div>
          </div>
          <div>
            <h3 className="uppercase flex items-center gap-2 font-bold mb-2">
              Llamadas 911:
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              {callFolios.map((folio: string, index: number) => {
                return (
                  <span
                    key={index}
                    className="bg-[#F5F5F5] py-1 px-2 rounded-full font-medium"
                  >
                    {folio}
                  </span>
                );
              })}
            </div>
          </div>
          <div>
            <h3 className="uppercase flex items-center gap-2 font-bold mb-2">
              Folios IPH:
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              {iphFolios.map((folio: string, index: number) => {
                return (
                  <span
                    key={index}
                    className="bg-[#F5F5F5] py-1 px-2 rounded-full font-medium"
                  >
                    {folio}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
