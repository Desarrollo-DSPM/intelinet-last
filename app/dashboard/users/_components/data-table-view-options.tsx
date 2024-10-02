"use client";

import { useState } from "react";

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
import { ModalRegisterUser } from "@/components/ui-custom/modals/register-user-modal";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const [openModalRegisterUser, setOpenModalRegisterUser] = useState(false);

  return (
    <>
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
                  typeof column.accessorFn !== "undefined" &&
                  column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id === "employeeNumber"
                      ? "# Empleado"
                      : column.id === "name"
                      ? "Nombre(s)"
                      : column.id === "lastname"
                      ? "Apellido(s)"
                      : column.id === "username"
                      ? "Usuario"
                      : column.id === "email"
                      ? "Correo"
                      : column.id === "department"
                      ? "Departamento"
                      : column.id === "role"
                      ? "Rol"
                      : column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button onClick={() => setOpenModalRegisterUser(true)}>
          <CirclePlus className="w-4 h-4 mr-2" />
          <span>Agregar nuevo usuario</span>
        </Button>
      </div>
      <ModalRegisterUser
        isOpen={openModalRegisterUser}
        onClose={setOpenModalRegisterUser}
      />
    </>
  );
}
