"use client";

import { Dispatch, SetStateAction } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateModuleForm } from "@/components/ui-custom/forms/create-module-form";

interface ModalCreateModuleProps {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}

export const ModalCreateModule = ({
  isOpen,
  onClose,
}: ModalCreateModuleProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Crear nuevo módulo</DialogTitle>
        </DialogHeader>
        <CreateModuleForm onCloseModal={onClose} />
      </DialogContent>
    </Dialog>
  );
};
