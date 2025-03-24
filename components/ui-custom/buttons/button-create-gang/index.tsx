"use client";

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {ModalCreateGang} from "@/components/ui-custom/modals/modal-create-gang";

export function ButtonCreateGang() {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Crear nueva pandilla</Button>
      <ModalCreateGang isOpen={openModal} onClose={setOpenModal} />
    </>
  );
}
