"use client";

import { Title } from "@/components/ui-custom/title";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InvestigationWithDetails } from "@/lib/db/schema";
import { Ellipsis } from "lucide-react";

interface InvestigationDocumentProps {
  data: InvestigationWithDetails;
}

export const InvestigationDocument = ({ data }: InvestigationDocumentProps) => {
  const handleOnClick = async () => {
    const html2pdf = await require("html2pdf.js");
    const element = document.getElementById("investigation-pdf");
    html2pdf(element, {
      margin: 5,
      filename: "investigacion-uap.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "A4", orientation: "portrait" },
    });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10">
        <Title>Investigaciones UAP</Title>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <Ellipsis className="h-4 w-4" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent onClick={() => handleOnClick()}>
            <DropdownMenuItem>Descargar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div id="investigation-pdf">
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
          <div className="col-span-2 bg-secondary p-2">
            <h3 className="uppercase text-xs flex items-center gap-2 font-bold">
              Nombre del elemento:{" "}
              <p className="font-normal normal-case">
                {data.createdBy.name} {data.createdBy.lastname}
              </p>
            </h3>
          </div>
          <div className="bg-secondary p-2">
            <h3 className="uppercase text-xs flex items-center gap-2 font-bold">
              Grupo: <p className="font-normal">{data.investigation.group}</p>
            </h3>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="col-span-2 bg-secondary p-2">
            <h3 className="uppercase text-xs flex items-center gap-2 font-bold">
              Nombre del elemento que brinda apoyo:{" "}
              <p className="font-normal normal-case">
                {data.supportBy
                  ? `${data.supportBy.name} ${data.supportBy.lastname}`
                  : ""}
              </p>
            </h3>
          </div>
          <div className="bg-secondary p-2">
            <h3 className="uppercase text-xs flex items-center gap-2 font-bold">
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
      </div>
    </>
  );
};
