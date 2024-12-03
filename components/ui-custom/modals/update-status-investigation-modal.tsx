"use client";

import { Dispatch, SetStateAction } from "react";
import { Investigation } from "@/lib/db/schema";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateInvestigationOneColumn } from "@/actions/investigations/update-one-column-investigation";

interface ModalUpdateStatusInvestigationProps {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  investigationId: Investigation["id"];
  status: Investigation["status"];
}

export const ModalUpdateStatusInvestigation = ({
  isOpen,
  onClose,
  investigationId,
  status,
}: ModalUpdateStatusInvestigationProps) => {
  const router = useRouter();
  const handleUpdateInvestigation = async () => {
    const res = await updateInvestigationOneColumn({
      id: investigationId,
      column: "status",
      value: status ?? "in-progress",
    });

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
            {status === "done"
              ? "¿Estás seguro de completar la investigación?"
              : "¿Estás seguro de cancelar la investigación?"}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {status === "done"
            ? "Al completar la investigación, no podrás realizar más cambios."
            : "Al cancelar la investigación, no podrás realizar más cambios."}
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
            variant={status === "done" ? "default" : "destructive"}
            onClick={handleUpdateInvestigation}
          >
            {status === "done"
              ? "Si, completar investigación"
              : "Si, cancelar investigación"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
