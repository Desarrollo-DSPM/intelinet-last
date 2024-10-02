"use server";

import { z } from "zod";

import { db } from "@/lib/db/db";
import { departments, NewDepartment } from "@/lib/db/schema";

import { formSchemaCreateDepartment } from "@/types/department";

interface CreateDepartmentProps {
  values: z.infer<typeof formSchemaCreateDepartment>;
}

export const createDepartment = async ({ values }: CreateDepartmentProps) => {
  try {
    const { name } = values;

    const NewDepartment: NewDepartment = {
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.insert(departments).values(NewDepartment);

    return { response: "success", message: "Departamento creado" };
  } catch (error) {
    return { response: "error", message: `Ha ocurrido un error: ${error}` };
  }
};
