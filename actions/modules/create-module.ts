"use server";

import { z } from "zod";

import { db } from "@/lib/db/db";
import { modules, NewModule } from "@/lib/db/schema";

import { formSchemaCreateModule } from "@/types/module";

interface CreateDepartmentProps {
  values: z.infer<typeof formSchemaCreateModule>;
}

export const createModule = async ({ values }: CreateDepartmentProps) => {
  try {
    const { name } = values;

    const newModule: NewModule = {
      name: name.toLowerCase(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.insert(modules).values(newModule);

    return { response: "success", message: "Módulo creado" };
  } catch (error) {
    return { response: "error", message: `Ha ocurrido un error: ${error}` };
  }
};
