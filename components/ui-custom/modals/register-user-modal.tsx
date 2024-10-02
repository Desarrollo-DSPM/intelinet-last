"use client";

import { Dispatch, SetStateAction } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RegisterUserForm } from "@/components/ui-custom/forms/register-user-form";

interface ModalRegisterUserProps {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}

export const ModalRegisterUser = ({
  isOpen,
  onClose,
}: ModalRegisterUserProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Registrar usuario</DialogTitle>
        </DialogHeader>
        <RegisterUserForm
          fromPage="dashboard-create-user"
          onCloseModal={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};
