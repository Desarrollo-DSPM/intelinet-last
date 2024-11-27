"use server";

import { db } from "@/lib/db/db";
import { investigations, User } from "@/lib/db/schema";
import { formSchemaCreateInvestigation } from "@/types/investigation";
import { format } from "date-fns";
import { z } from "zod";

interface CreateInvestigationProps {
  userId: User["id"];
  values: z.infer<typeof formSchemaCreateInvestigation>;
}

export const createInvestigation = async ({
  userId,
  values,
}: CreateInvestigationProps) => {
  try {
    const {
      group,
      supportUserId,
      district,
      investigationTypeId,
      investigationDate,
      location,
      physicalVictim,
      moralVictim,
      callFolios,
      iphFolios,
      victimInv,
      witnessInv,
      invAccused,
      photoCount,
      videoCount,
    } = values;

    // Formateamos la fecha de la investigación a dd/MM/yyyy
    const formattedDate = format(new Date(investigationDate), "dd/MM/yyyy");

    await db.insert(investigations).values({
      userId,
      group,
      supportUserId,
      district,
      investigationTypeId,
      investigationDate: formattedDate.toString(),
      location,
      physicalVictim,
      moralVictim,
      callFolios,
      iphFolios,
      victimInv,
      witnessInv,
      invAccused,
      photoCount,
      videoCount,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return { response: "success", message: "Nueva investigación creada" };
  } catch (error) {
    return { response: "error", message: `Ha ocurrido un error: ${error}` };
  }
};
