"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { ModalCreateModule } from "@/components/ui-custom/modals/create-module-modal";

export function DataTableViewOptions() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        <Button onClick={() => setIsOpen(true)}>
          <CirclePlus className="w-4 h-4 mr-2" />
          <span>Agregar nuevo módulo</span>
        </Button>
      </div>
      <ModalCreateModule isOpen={isOpen} onClose={setIsOpen} />
    </>
  );
}
