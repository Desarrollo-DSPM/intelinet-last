"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { InvestigationWithDetails } from "@/lib/db/schema";
import { dateFormat } from "@/helpers/dates";

export const columns: ColumnDef<InvestigationWithDetails>[] = [
  {
    accessorFn: (row: InvestigationWithDetails) => row.createdBy.name,
    id: "createdBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Creada por" />
    ),
    cell: ({ row }) => (
      <div>
        <p>
          {row.original.createdBy.name} {row.original.createdBy.lastname}
        </p>
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
    id: "actions",
    cell: ({ row }) => <DataTableRowActions data={row.original} />,
  },
];
