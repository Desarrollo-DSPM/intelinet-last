"use server";

import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db/db";
import { Investigation, investigations } from "@/lib/db/schema";

interface UpdateInvestigationOneColumnProps {
  id: Investigation["id"];
  column: keyof Investigation;
  value: string | number | boolean;
}

export const updateInvestigationOneColumn = async ({
  id,
  column,
  value,
}: UpdateInvestigationOneColumnProps) => {
  try {
    const investigation = await db.query.investigations.findFirst({
      where: and(eq(investigations.id, id)),
    });

    if (!investigation) {
      return {
        response: "error",
        message: "Investigación no encontrada",
        data: null,
      };
    }

    // Actualización del campo compartido
    await db
      .update(investigations)
      .set({
        [column]: value,
      })
      .where(and(eq(investigations.id, id)));

    return { response: "success", message: "Investigación actualizada" };
  } catch (error) {
    return { response: "error", message: `Ha ocurrido un error: ${error}` };
  }
};
