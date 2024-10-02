"use server";

import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db/db";
import { Department, departments } from "@/lib/db/schema";

export async function getDepartmentById(id: Department["id"]) {
  try {
    const department = await db.query.departments.findFirst({
      where: and(eq(departments.id, id), eq(departments.isActive, 1)),
    });

    if (!department) {
      return {
        response: "error",
        message: "Departamento no encontrado",
        data: null,
      };
    }

    return {
      response: "success",
      message: "Departamento encontrado",
      data: department,
    };
  } catch (error) {
    return {
      response: "error",
      message: `Ha ocurrido un error: ${error}`,
      data: null,
    };
  }
}
