"use server";

import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db/db";
import { Department, departments } from "@/lib/db/schema";

interface DeleteDepartmentProps {
  id: Department["id"];
}

export const deleteDepartment = async ({ id }: DeleteDepartmentProps) => {
  try {
    const department = await db.query.departments.findFirst({
      where: and(eq(departments.id, id)),
    });

    if (!department) {
      return {
        response: "error",
        message: "Departamento no encontrado",
        data: null,
      };
    }

    // Borrado logico
    await db
      .update(departments)
      .set({
        isActive: 0,
      })
      .where(and(eq(departments.id, id)));

    return { response: "success", message: "Departamento eliminado" };
  } catch (error) {
    return { response: "error", message: `Ha ocurrido un error: ${error}` };
  }
};
