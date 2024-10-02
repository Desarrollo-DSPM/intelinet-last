"use client";

import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";

import { Department } from "@/lib/db/schema";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteDepartment } from "@/actions/departments/delete-department";

interface DeleteDepartmentModalProps {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  department: Department;
}

export const DeleteDepartmentModal = ({
  isOpen,
  onClose,
  department,
}: DeleteDepartmentModalProps) => {
  const router = useRouter();
  const handleDeleteDepartment = async () => {
    const res = await deleteDepartment({ id: department.id });

    if (res?.response === "success") {
      router.refresh();
      onClose(false);
      toast.success(res?.message);
    } else {
      toast.error(res?.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose(false)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            ¿Estás seguro de eliminar {department.name}?
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          El departamento se eliminará permanentemente y su información no podrá
          ser recuperada.
        </DialogDescription>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onClose(false)}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDeleteDepartment}
          >
            Si, eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
