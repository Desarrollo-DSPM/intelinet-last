"use server";

import { z } from "zod";
import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db/db";
import { Module, modules } from "@/lib/db/schema";

import { formSchemaEditModule } from "@/types/module";

interface EditModuleProps {
  values: z.infer<typeof formSchemaEditModule>;
  id: Module["id"];
}

export const editModule = async ({ values, id }: EditModuleProps) => {
  try {
    const { name } = values;

    await db
      .update(modules)
      .set({ name: name.toLowerCase() })
      .where(and(eq(modules.id, id)));

    return { response: "success", message: "Módulo editado" };
  } catch (error) {
    return { response: "error", message: `Ha ocurrido un error: ${error}` };
  }
};
