"use server";

import { z } from "zod";
import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db/db";
import { Department, departments } from "@/lib/db/schema";

import { formSchemaEditDepartment } from "@/types/department";

interface EditDepartmentProps {
  values: z.infer<typeof formSchemaEditDepartment>;
  id: Department["id"];
}

export const editDepartment = async ({ values, id }: EditDepartmentProps) => {
  try {
    const { name } = values;

    await db
      .update(departments)
      .set({ name })
      .where(and(eq(departments.id, id)));

    return { response: "success", message: "Departamento editado" };
  } catch (error) {
    return { response: "error", message: `Ha ocurrido un error: ${error}` };
  }
};
