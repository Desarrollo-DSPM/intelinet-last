"use server";

import {db} from "@/lib/db/db";
import {eq} from "drizzle-orm";

import {Gang, gangs} from "@/lib/db/schema";

export const getAllGangs = async () => {
  try {
    const res: Gang[] = await db
      .select()
      .from(gangs)
      .where(eq(gangs.isActive, 1));

    if (res.length <= 0) {
      return {
        response: "error",
        message: "Departamentos no encontrados",
        data: []
      };
    }
    return {
      response: "success",
      message: "Departamentos obtenidos",
      data: res
    };
  } catch (error) {
    return {
      response: "error",
      message: `Ha ocurrido un error: ${error}`,
      data: []
    };
  }
};
