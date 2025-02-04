"use client";

import { useRef, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InvestigationWithDetails } from "@/lib/db/schema";

import {
  Ban,
  CircleCheckBig,
  Copy,
  Ellipsis,
  Eye,
  Pencil,
  Printer,
  Share2,
} from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { InvestigationDocument } from "@/components/ui-custom/investigation-document";
import { copyToClipboard } from "@/helpers/copy-clipboard";
import { ModalSharedInvestigation } from "@/components/ui-custom/modals/shared-investigation-modal";
import { ModalUpdateStatusInvestigation } from "@/components/ui-custom/modals/update-status-investigation-modal";
import { useAuth } from "@/hooks/use-auth";

interface DataTableRowActionsProps {
  data: InvestigationWithDetails;
  group: string;
}

export function DataTableRowActions({ data, group }: DataTableRowActionsProps) {
  const [openModalSharedInvestigation, setOpenModalSharedInvestigation] =
    useState(false);
  const [openModalCompleteInvestigation, setOpenModalCompleteInvestigation] =
    useState(false);
  const [openModalCancelledInvestigation, setOpenModalCancelledInvestigation] =
    useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: `Investigación ${group}`,
  });

  const { auth } = useAuth();

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
        <DropdownMenuContent align="end" className="w-[160px]">
          {auth?.id === data.createdBy.id || auth?.role === "admin" ? (
            data.investigation.status !== "done" &&
            data.investigation.status !== "cancelled" ? (
              <DropdownMenuItem asChild>
                <Link
                  href={`/dashboard/investigations/${data.investigation.id}`}
                  className="items-center"
                >
                  <Pencil className="w-4 h-4 mr-4" />
                  Editar
                </Link>
              </DropdownMenuItem>
            ) : null
          ) : null}
          <DropdownMenuItem asChild>
            <Link
              href={`/dashboard/investigations/${data.investigation.id}/preview`}
              className="items-center"
            >
              <Eye className="w-4 h-4 mr-4" />
              Vista previa
            </Link>
          </DropdownMenuItem>
          {data.investigation.status !== "cancelled" && (
            <DropdownMenuItem
              className="flex items-center"
              onClick={() => reactToPrintFn()}
            >
              <Printer className="size-4 mr-4" />
              Imprimir
            </DropdownMenuItem>
          )}
          {auth?.id === data.createdBy.id || auth?.role === "admin"
            ? data.investigation.status !== "cancelled" &&
              (data.investigation.shared === 0 ? (
                <DropdownMenuItem
                  className="flex items-center"
                  onClick={() => setOpenModalSharedInvestigation(true)}
                >
                  <Share2 className="size-4 mr-4" />
                  Compartir
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={() =>
                    copyToClipboard(
                      `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/investigations/${data.investigation.id}/shared`
                    )
                  }
                >
                  <span className="flex items-center">
                    <Copy className="size-4 mr-4" />
                    Copiar URL
                  </span>
                </DropdownMenuItem>
              ))
            : null}
          {auth?.id === data.createdBy.id || auth?.role === "admin" ? (
            data.investigation.status !== "done" &&
            data.investigation.status !== "cancelled" ? (
              <>
                <DropdownMenuItem
                  onClick={() => setOpenModalCompleteInvestigation(true)}
                >
                  <span className="flex items-center">
                    <CircleCheckBig className="size-4 mr-4" />
                    Completar
                  </span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setOpenModalCancelledInvestigation(true)}
                >
                  <span className="flex items-center">
                    <Ban className="size-4 mr-4" />
                    Cancelar
                  </span>
                </DropdownMenuItem>
              </>
            ) : null
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="hidden">
        <InvestigationDocument data={data} contentRef={contentRef} />
      </div>
      <ModalSharedInvestigation
        isOpen={openModalSharedInvestigation}
        onClose={setOpenModalSharedInvestigation}
        investigationId={data.investigation.id}
      />
      <ModalUpdateStatusInvestigation
        isOpen={openModalCompleteInvestigation}
        onClose={setOpenModalCompleteInvestigation}
        investigationId={data.investigation.id}
        status="done"
      />
      <ModalUpdateStatusInvestigation
        isOpen={openModalCancelledInvestigation}
        onClose={setOpenModalCancelledInvestigation}
        investigationId={data.investigation.id}
        status="cancelled"
      />
    </>
  );
}
