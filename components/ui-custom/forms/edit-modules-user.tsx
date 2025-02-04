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
  const [modules, setModules] = useState<string[]>(() => {
    try {
      return data.modules ? JSON.parse(data.modules as unknown as string) : [];
    } catch (error) {
      console.error("Error al parsear los módulos:", error);
      return [];
    }
  });

  const handleModuleChange = (module: string) => {
    if (Array.isArray(modules)) {
      if (modules.includes(module)) {
        setModules(modules.filter((m) => m !== module));
      } else {
        setModules([...modules, module]);
      }
    } else {
      console.error("Los módulos no son array");
    }
  };

  useEffect(() => {
    (async () => {
      if (Array.isArray(modules)) {
        await editModulesUser({
          modules: JSON.stringify(modules),
          id: data.id,
        });
      } else {
        console.error(
          "Los modulos no son array no se pueden guardar en la base de datos"
        );
      }
    })();
  }, [modules, data.id]);

  return (
    <div className="space-y-3">
      <div className="flex flex-row items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <Label className="text-base">
            CIC - Coordinación de investigación criminal
          </Label>
          <div>Acceso al módulo de CIC</div>
        </div>
        <div>
          <Switch
            checked={modules.includes("cic") ? true : false}
            onCheckedChange={() => handleModuleChange("cic")}
          />
        </div>
      </div>
      <div className="flex flex-row items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <Label className="text-base">
            UAP - Unidad de atención a pandillas
          </Label>
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
