"use client";

import {useState, useEffect} from "react";
import {Table} from "@tanstack/react-table";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {DataTableViewOptions} from "./data-table-view-options";
import {DataTableFacetedFilter} from "./data-table-faceted-filter";

import {getAllInvestigationsTypes} from "@/actions/investigations/get-all-investigations-types";
import {formatInvestigationTypes, statuses} from "./data";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  group: string;
}

export function DataTableToolbar<TData>({
  table,
  group
}: DataTableToolbarProps<TData>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [investigationTypes, setInvestigationTypes] = useState<any[]>([]);
  const isFiltered = table.getState().columnFilters.length > 0;

  useEffect(() => {
    async function loadInvestigationTypes() {
      try {
        const investigationTypes = await getAllInvestigationsTypes();
        const investigationTypesFormatted = formatInvestigationTypes(
          investigationTypes.data
        );
        setInvestigationTypes(investigationTypesFormatted);
      } catch (error) {
        console.error("Error al cargar los tipos de investigaciones", error);
      }
    }

    loadInvestigationTypes();
  }, []);

  return (
    <div className="flex flex-col xl:flex-row items-start justify-between gap-y-2">
      <div className="flex flex-col xl:flex-row flex-1 items-start xl:items-center flex-wrap w-full gap-2">
        <Input
          placeholder="Filtrar por nombre..."
          value={
            (table.getColumn("createdBy")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("createdBy")?.setFilterValue(event.target.value)
          }
          className="lg:w-[250px]"
        />
        {table.getColumn("investigationType") && (
          <DataTableFacetedFilter
            column={table.getColumn("investigationType")}
            title="Tipo de investigación"
            options={investigationTypes}
          />
        )}
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Estatus"
            options={statuses}
          />
        )}
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
      <DataTableViewOptions table={table} group={group} />
    </div>
  );
}
