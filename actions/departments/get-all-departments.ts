"use server";

import { db } from "@/lib/db/db";
import { eq } from "drizzle-orm";

import { Department, departments } from "@/lib/db/schema";

export const getAllDepartments = async () => {
  try {
    const res: Department[] = await db
      .select()
      .from(departments)
      .where(eq(departments.isActive, 1));

    if (res.length <= 0) {
      return {
        response: "error",
        message: "Departamento no encontrado",
        data: [],
      };
    }
    return {
      response: "success",
      message: "Departamentos obtenidos",
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
