"use server";

import { db } from "@/lib/db/db";
import { eq } from "drizzle-orm";

import { EventType, investigationsTypes } from "@/lib/db/schema";

export const getAllInvestigationsTypes = async () => {
  try {
    const res: EventType[] = await db
      .select()
      .from(investigationsTypes)
      .where(eq(investigationsTypes.isActive, 1));

    if (res.length <= 0) {
      return {
        response: "error",
        message: "Tipo de investigación no encontrado",
        data: [],
      };
    }
    return {
      response: "success",
      message: "Tipos de investigación obtenidos",
      data: res,
    };
  } catch (error) {
    return {
      response: "error",
      message: `Ha ocurrido un error: ${error}`,
      data: [],
    };
  }
};
