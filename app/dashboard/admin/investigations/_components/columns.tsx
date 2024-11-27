"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { InvestigationWithDetails } from "@/lib/db/schema";
import { dateFormat } from "@/helpers/dates";
import { statuses } from "../_data/data";

export const columns: ColumnDef<InvestigationWithDetails>[] = [
  {
    accessorFn: (row: InvestigationWithDetails) => row.investigation.id,
    id: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div>
        <p>INV-{row.original.investigation.id}</p>
      </div>
    ),
  },
  {
    accessorFn: (row: InvestigationWithDetails) => row.createdBy.name,
    id: "createdBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Creada por" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <span className="flex items-center justify-center h-9 w-9 border border-border rounded-full">
          {row.original.createdBy.name?.charAt(0)}
          {row.original.createdBy.lastname?.charAt(0)}
        </span>
        <div>
          <p>
            {row.original.createdBy.name} {row.original.createdBy.lastname}
          </p>
        </div>
      </div>
    ),
  },
  {
    accessorFn: (row: InvestigationWithDetails) => row.investigation.group,
    id: "group",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Grupo" />
    ),
    cell: ({ row }) => (
      <div>
        <p className="uppercase">{row.original.investigation.group}</p>
      </div>
    ),
  },
  {
    accessorFn: (row: InvestigationWithDetails) => row.investigation.district,
    id: "district",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Grupo" />
    ),
    cell: ({ row }) => (
      <div>
        <p className="capitalize">{row.original.investigation.district}</p>
      </div>
    ),
  },
  {
    accessorFn: (row: InvestigationWithDetails) => row.investigationType?.name,
    id: "investigationType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo" />
    ),
    cell: ({ row }) => (
      <div>
        <p>{row.original.investigationType?.name}</p>
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorFn: (row: InvestigationWithDetails) =>
      row.investigation.investigationDate,
    id: "investigationDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha" />
    ),
    cell: ({ row }) => (
      <div>
        <p>{dateFormat(row.original.investigation.investigationDate)}</p>
      </div>
    ),
  },
  {
    accessorFn: (row: InvestigationWithDetails) => row.investigation.status,
    id: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estatus" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions data={row.original} />,
  },
];
