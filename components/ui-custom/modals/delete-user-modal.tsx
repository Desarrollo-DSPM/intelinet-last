"use client";

import { Dispatch, SetStateAction } from "react";
import { UserWithDepartment } from "@/lib/db/schema";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteUser } from "@/actions/delete-user";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  user: UserWithDepartment;
}

export const DeleteUserModal = ({
  isOpen,
  onClose,
  user,
}: DeleteUserModalProps) => {
  const router = useRouter();
  const handleDeleteUser = async () => {
    const res = await deleteUser({ id: user.id });

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
          <DialogTitle>¿Estás seguro de eliminar a {user.name}?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          El usuario se eliminará permanentemente y su información no podrá ser
          recuperada.
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
            onClick={handleDeleteUser}
          >
            Si, eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
