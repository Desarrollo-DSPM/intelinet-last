"use client";

import { ColumnDef } from "@tanstack/react-table";

import { roles } from "../_data/data";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { UserWithDepartment } from "@/lib/db/schema";

export const columns: ColumnDef<UserWithDepartment>[] = [
  {
    accessorKey: "employeeNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="# Empleado" />
    ),
    cell: ({ row }) => (
      <div>
        <p>{row.getValue("employeeNumber")}</p>
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => (
      <div>
        <p>{row.getValue("name")}</p>
      </div>
    ),
  },
  {
    accessorKey: "lastname",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Apellidos" />
    ),
    cell: ({ row }) => (
      <div>
        <p>{row.getValue("lastname")}</p>
      </div>
    ),
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Usuario" />
    ),
    cell: ({ row }) => (
      <div>
        <p>{row.getValue("username")}</p>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Correo electrónico" />
    ),
    cell: ({ row }) => (
      <div>
        <p>{row.getValue("email")}</p>
      </div>
    ),
  },
  {
    accessorKey: "department",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Departamento" />
    ),
    cell: ({ row }) => (
      <div>
        <p>{row.getValue("department")}</p>
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rol" />
    ),
    cell: ({ row }) => {
      const role = roles.find((role) => role.value === row.getValue("role"));

      if (!role) {
        return null;
      }

      return (
        <div className="flex items-center">
          {role.icon && (
            <role.icon className="mr-2 w-4 h-4 text-muted-foreground" />
          )}
          <span>{role.label}</span>
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
