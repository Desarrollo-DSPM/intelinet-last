"use server";

import { db } from "@/lib/db/db";

import { Module, modules } from "@/lib/db/schema";

export const getAllModules = async () => {
  try {
    const res: Module[] = await db.select().from(modules);

    if (res.length <= 0) {
      return { response: "error", message: "No hay módulos", data: [] };
    }
    return { response: "success", message: "Módulos obtenidos", data: res };
  } catch (error) {
    return {
      response: "error",
      message: `Ha ocurrido un error: ${error}`,
      data: [],
    };
  }
};
