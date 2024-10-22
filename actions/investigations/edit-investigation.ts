"use server";

import { db } from "@/lib/db/db";
import { Investigation, investigations } from "@/lib/db/schema";
import { formSchemaEditInvestigation } from "@/types/investigation";
import { format } from "date-fns";
import { eq } from "drizzle-orm";
import { z } from "zod";

interface EditInvesigationProps {
  id: Investigation["id"];
  values: z.infer<typeof formSchemaEditInvestigation>;
}

export const editInvestigation = async ({
  id,
  values,
}: EditInvesigationProps) => {
  try {
    const {
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
      people,
      census,
      afis,
      atecedentsAOP,
      socialNetworks,
      peopleFiles,
      comparision,
      chronologyUAT,
    } = values;

    // Formateamos la fecha de la investigación a dd/MM/yyyy
    const formattedDate = format(new Date(investigationDate), "dd/MM/yyyy");

    await db
      .update(investigations)
      .set({
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
        people,
        census,
        afis,
        atecedentsAOP,
        socialNetworks,
        peopleFiles,
        comparision,
        chronologyUAT,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(investigations.id, id));

    return { response: "success", message: "Investigación modificada" };
  } catch (error) {
    return { response: "error", message: `Ha ocurrido un error: ${error}` };
  }
};
