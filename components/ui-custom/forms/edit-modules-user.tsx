"use client";

import { User } from "@/lib/db/schema";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { editModulesUser } from "@/actions/users/edit-modules";

interface EditModulesUserProps {
  data: User;
}

export const EditModulesUser = ({ data }: EditModulesUserProps) => {
  const [modules, setModules] = useState<string[]>(data.modules as string[]);

  const handleModuleChange = (module: string) => {
    if (modules.includes(module)) {
      setModules(modules.filter((m) => m !== module));
    } else {
      setModules([...modules, module]);
    }
  };

  useEffect(() => {
    (async () => {
      await editModulesUser({ modules, id: data.id });
    })();
  }, [modules, data.id]);

  return (
    <div>
      <div className="flex flex-row items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <Label className="text-base">UAP</Label>
          <div>Acceso al módulo de UAP</div>
        </div>
        <div>
          <Switch
            checked={modules.includes("uap") ? true : false}
            onCheckedChange={() => handleModuleChange("uap")}
          />
        </div>
      </div>
    </div>
  );
};
