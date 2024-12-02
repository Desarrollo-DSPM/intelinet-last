"use server";

import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db/db";
import { Investigation, investigations } from "@/lib/db/schema";

interface SharedInvesigationProps {
  id: Investigation["id"];
}

export const sharedInvestigation = async ({ id }: SharedInvesigationProps) => {
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

    // Borrado logico
    await db
      .update(investigations)
      .set({
        shared: 1,
      })
      .where(and(eq(investigations.id, id)));

    return { response: "success", message: "Investigación compartida" };
  } catch (error) {
    return { response: "error", message: `Ha ocurrido un error: ${error}` };
  }
};
