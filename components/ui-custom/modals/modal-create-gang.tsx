"use client";

import {Dispatch, SetStateAction} from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {FormCreateGang} from "@/components/ui-custom/forms/form-create-gang";

interface ModalCreateGangProps {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}

export const ModalCreateGang = ({isOpen, onClose}: ModalCreateGangProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Crear nueva pandilla</DialogTitle>
        </DialogHeader>
        <FormCreateGang onCloseModal={onClose} />
      </DialogContent>
    </Dialog>
  );
};
