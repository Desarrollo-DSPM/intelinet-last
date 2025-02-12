"use client";

import {User} from "@/lib/db/schema";

import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";
import {useState, useEffect} from "react";
import {editModulesUser} from "@/actions/users/edit-modules";

interface EditModulesUserProps {
  data: User;
}

export const EditModulesUser = ({data}: EditModulesUserProps) => {
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
          id: data.id
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
          <div>
            <p className="text-muted-foreground">
              Acceso al módulo de unidad de coordinación de investigación
              criminal.
            </p>
          </div>
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
          <div>
            <p className="text-muted-foreground">
              Acceso al módulo de unidad de atención a pandillas.
            </p>
          </div>
        </div>
        <div>
          <Switch
            checked={modules.includes("uap") ? true : false}
            onCheckedChange={() => handleModuleChange("uap")}
          />
        </div>
      </div>
      <div className="flex flex-row items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <Label className="text-base">
            UEDG - Unidad especializada en delitos de genero
          </Label>
          <div>
            <p className="text-muted-foreground">
              Acceso al módulo de unidad especializada en delitos de genero.
            </p>
          </div>
        </div>
        <div>
          <Switch
            checked={modules.includes("uedg") ? true : false}
            onCheckedChange={() => handleModuleChange("uedg")}
          />
        </div>
      </div>
      <div className="flex flex-row items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <Label className="text-base">
            UIP - Unidad de investigación policial
          </Label>
          <div>
            <p className="text-muted-foreground">
              Acceso al módulo de unidad de investigación policial.
            </p>
          </div>
        </div>
        <div>
          <Switch
            checked={modules.includes("uip") ? true : false}
            onCheckedChange={() => handleModuleChange("uip")}
          />
        </div>
      </div>
      <div className="flex flex-row items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <Label className="text-base">UC - Unidad de criminalística</Label>
          <div>
            <p className="text-muted-foreground">
              Acceso al módulo de unidad de criminalística.
            </p>
          </div>
        </div>
        <div>
          <Switch
            checked={modules.includes("uc") ? true : false}
            onCheckedChange={() => handleModuleChange("uc")}
          />
        </div>
      </div>
      <div className="flex flex-row items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <Label className="text-base">
            UAR - Unidad de atención a robo casa habitación
          </Label>
          <div>Acceso al módulo de UAR</div>
        </div>
        <div>
          <Switch
            checked={modules.includes("uar") ? true : false}
            onCheckedChange={() => handleModuleChange("uar")}
          />
        </div>
      </div>
      <div className="flex flex-row items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <Label className="text-base">
            UIIE - Unidad de investigación de incendios y explosiones.
          </Label>
          <div>
            <p className="text-muted-foreground">
              Acceso al módulo de unidad de investigación de incendios y
              explosiones.
            </p>
          </div>
        </div>
        <div>
          <Switch
            checked={modules.includes("uar") ? true : false}
            onCheckedChange={() => handleModuleChange("uar")}
          />
        </div>
      </div>
      <div className="flex flex-row items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <Label className="text-base">
            GAPV - Grupo de atención y protección de victimas.
          </Label>
          <div>
            <p className="text-muted-foreground">
              Acceso al módulo de grupo de atención y protección a victimas.
            </p>
          </div>
        </div>
        <div>
          <Switch
            checked={modules.includes("gapv") ? true : false}
            onCheckedChange={() => handleModuleChange("gapv")}
          />
        </div>
      </div>
    </div>
  );
};
