"use client";

import {ColumnDef} from "@tanstack/react-table";

import {DataTableColumnHeader} from "./data-table-column-header";
import {DataTableRowActions} from "./data-table-row-actions";
import {Department} from "@/lib/db/schema";

export const columns: ColumnDef<Department>[] = [
  {
    accessorKey: "name",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Pandilla" />
    ),
    cell: ({row}) => (
      <div>
        <p>{row.getValue("name")}</p>
      </div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: "location",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Ubicación" />
    ),
    cell: ({row}) => (
      <div>
        <p>{row.getValue("location")}</p>
      </div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: "members",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Integrantes" />
    ),
    cell: ({row}) => (
      <div>
        <p>{row.getValue("members")}</p>
      </div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    id: "actions",
    cell: ({row}) => <DataTableRowActions data={row.original} />
  }
];
