"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ModalCreateModule } from "@/components/ui-custom/modals/create-module-modal";

export const ButtonCreateModule = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Crear nuevo módulo</Button>
      <ModalCreateModule isOpen={isOpen} onClose={setIsOpen} />
    </>
  );
};
