"use client";

import { useRef } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InvestigationWithDetails } from "@/lib/db/schema";

import { Ellipsis, Eye, Pencil, Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { InvestigationDocument } from "@/components/ui-custom/investigation-document";

interface DataTableRowActionsProps {
  data: InvestigationWithDetails;
}

export function DataTableRowActions({ data }: DataTableRowActionsProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "Investigación UAP",
  });

  return (
    <>
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
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link
              href={`/dashboard/groups/uap/investigations/${data.investigation.id}`}
              className="items-center"
            >
              <Pencil className="w-4 h-4 mr-2" />
              Editar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={`/dashboard/groups/uap/investigations/preview/${data.investigation.id}`}
              className="items-center"
            >
              <Eye className="w-4 h-4 mr-2" />
              Vista previa
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center"
            onClick={() => reactToPrintFn()}
          >
            <Printer className="size-4 mr-2" />
            Imprimir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="hidden">
        <InvestigationDocument data={data} contentRef={contentRef} />
      </div>
    </>
  );
}
