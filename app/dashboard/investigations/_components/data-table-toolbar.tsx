"use client";

import { useState, useEffect } from "react";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

import { getAllDepartments } from "@/actions/departments/get-all-departments";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const [departamentos, setDepartamentos] = useState<any[]>([]);
  const isFiltered = table.getState().columnFilters.length > 0;

  // useEffect(() => {
  //   async function cargarDepartamentos() {
  //     try {
  //       const departamentosDesdeDB = await getAllDepartments();
  //       const departamentosFormateados = formatDepartments(
  //         departamentosDesdeDB.data
  //       );
  //       setDepartamentos(departamentosFormateados);
  //     } catch (error) {
  //       console.error("Error al cargar los departamentos", error);
  //     }
  //   }

  //   cargarDepartamentos();
  // }, []);

  return (
    <div className="flex flex-col xl:flex-row items-start justify-between gap-y-2">
      <div className="flex flex-col xl:flex-row flex-1 items-start xl:items-center flex-wrap w-full gap-2">
        <Input
          placeholder="Filtrar por nombre..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="px-2 lg:px-3"
          >
            Resetear
            <i className="fi fi-rr-cross-small ml-2"></i>
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
