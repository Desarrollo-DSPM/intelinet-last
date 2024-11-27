"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InvestigationWithDetails } from "@/lib/db/schema";

import { Ellipsis, Pencil } from "lucide-react";

interface DataTableRowActionsProps {
  data: InvestigationWithDetails;
}

export function DataTableRowActions({ data }: DataTableRowActionsProps) {
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
        <DropdownMenuContent align="end" className="w-[80px]">
          <DropdownMenuItem asChild>
            <Link
              href={`/dashboard/users/${data.investigation.id}`}
              className="items-center gap-2"
            >
              <Pencil className="w-4 h-4 mr-2" />
              Editar
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
