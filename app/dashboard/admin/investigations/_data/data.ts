import { InvestigationType } from "@/lib/db/schema";

import {
  CheckCircledIcon,
  CrossCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const formatInvestigationTypes = (
  investigationTypes: Pick<InvestigationType, "name">[]
) => {
  return investigationTypes.map((investigationType) => {
    return {
      value: investigationType.name,
      label: investigationType.name,
    };
  });
};

export const statuses = [
  {
    value: "in-progress",
    label: "En progreso",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "Completada",
    icon: CheckCircledIcon,
  },
  {
    value: "cancelled",
    label: "Canceleda",
    icon: CrossCircledIcon,
  },
];
