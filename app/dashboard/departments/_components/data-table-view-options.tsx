"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { ModalCreateDepartment } from "@/components/ui-custom/modals/create-department-modal";

export function DataTableViewOptions() {
  const [openModalRegisterUser, setOpenModalRegisterUser] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        <Button onClick={() => setOpenModalRegisterUser(true)}>
          <CirclePlus className="w-4 h-4 mr-2" />
          <span>Agregar nuevo departamento</span>
        </Button>
      </div>
      <ModalCreateDepartment
        isOpen={openModalRegisterUser}
        onClose={setOpenModalRegisterUser}
      />
    </>
  );
}
