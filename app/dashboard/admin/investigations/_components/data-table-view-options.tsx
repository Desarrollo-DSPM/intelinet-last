"use client";

import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { CirclePlus } from "lucide-react";
import Link from "next/link";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="lg:flex">
            <MixerHorizontalIcon className="mr-2 h-4 w-4" />
            Vista
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[150px]">
          <DropdownMenuLabel>Alternar columnas</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== "undefined" && column.getCanHide()
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id === "id"
                    ? "ID"
                    : column.id === "createdBy"
                    ? "Creado por"
                    : column.id === "group"
                    ? "Grupo"
                    : column.id === "district"
                    ? "Distrito"
                    : column.id === "investigationType"
                    ? "Tipo de investigación"
                    : column.id === "investigationDate"
                    ? "Fecha"
                    : column.id === "status"
                    ? "Estatus"
                    : column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
      <Button asChild>
        <Link
          href="/dashboard/investigations/new"
          className="flex items-center gap-2"
        >
          <CirclePlus className="w-4 h-4 mr-2" />
          <span>Nueva investigación</span>
        </Link>
      </Button>
    </div>
  );
}
