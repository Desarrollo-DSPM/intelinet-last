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

interface ModalSharedInvestigationProps {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  investigationId: Investigation["id"];
}

export const ModalSharedInvestigation = ({
  isOpen,
  onClose,
  investigationId,
}: ModalSharedInvestigationProps) => {
  const router = useRouter();
  const handleSharedInvestigation = async () => {
    const res = await updateInvestigationOneColumn({
      id: investigationId,
      column: "shared",
      value: 1,
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
            ¿Estás seguro de compartir la investigación?
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Todo usuario que tenga la url podrá visualizar la investigación.
        </DialogDescription>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onClose(false)}
          >
            Cancelar
          </Button>
          <Button type="button" onClick={handleSharedInvestigation}>
            Si, compartir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
