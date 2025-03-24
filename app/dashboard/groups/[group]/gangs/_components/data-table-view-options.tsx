"use client";

import {useState} from "react";

import {Button} from "@/components/ui/button";
import {ModalCreateGang} from "@/components/ui-custom/modals/modal-create-gang";

import {CirclePlus} from "lucide-react";

export function DataTableViewOptions() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        <Button onClick={() => setOpenModal(true)}>
          <CirclePlus className="w-4 h-4 mr-2" />
          <span>Agregar nueva pandilla</span>
        </Button>
      </div>
      <ModalCreateGang isOpen={openModal} onClose={setOpenModal} />
    </>
  );
}
