import { Department } from "@/lib/db/schema";

import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
} from "@radix-ui/react-icons";

export const roles = [
  {
    value: "admin",
    label: "Admin",
    icon: ArrowUpIcon,
  },
  {
    value: "support",
    label: "Soporte",
    icon: ArrowRightIcon,
  },
  {
    value: "default",
    label: "Default",
    icon: ArrowDownIcon,
  },
];

export const formatDepartments = (
  departamentos: Pick<Department, "name">[]
) => {
  return departamentos.map((departamento) => {
    return {
      value: departamento.name,
      label: departamento.name,
    };
  });
};
