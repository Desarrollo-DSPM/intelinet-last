"use client";

import { Dispatch, SetStateAction } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateDepartmentForm } from "../forms/create-department-form";

interface ModalCreateDepartmentProps {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}

export const ModalCreateDepartment = ({
  isOpen,
  onClose,
}: ModalCreateDepartmentProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Crear nuevo departamento</DialogTitle>
        </DialogHeader>
        <CreateDepartmentForm onCloseModal={onClose} />
      </DialogContent>
    </Dialog>
  );
};
