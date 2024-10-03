"use server";

import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db/db";
import { modules, Module } from "@/lib/db/schema";

export async function getModuleById(id: Module["id"]) {
  try {
    const foundModule = await db.query.modules.findFirst({
      where: and(eq(modules.id, id)),
    });

    if (!foundModule) {
      return {
        response: "error",
        message: "Módulo no encontrado",
        data: null,
      };
    }

    return {
      response: "success",
      message: "Módulo encontrado",
      data: foundModule,
    };
  } catch (error) {
    return {
      response: "error",
      message: `Ha ocurrido un error: ${error}`,
      data: null,
    };
  }
}
