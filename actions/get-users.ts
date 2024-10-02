"use server";

import { db } from "@/lib/db/db";
import { eq } from "drizzle-orm";

import { departments, users, UserWithDepartment } from "@/lib/db/schema";

export const getAllUsers = async () => {
  try {
    const res: UserWithDepartment[] = await db
      .select({
        id: users.id,
        department: departments.name,
        name: users.name,
        lastname: users.lastname,
        username: users.username,
        employeeNumber: users.employeeNumber,
        email: users.email,
        role: users.role,
        image: users.image,
        dateOfBirth: users.dateOfBirth,
        dateOfEntry: users.dateOfEntry,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
        isActive: users.isActive,
      })
      .from(users)
      .innerJoin(departments, eq(users.departmentId, departments.id))
      .where(eq(users.isActive, 1));

    if (res.length <= 0) {
      return { response: "error", message: "Usuario no encontrado", data: [] };
    }
    return { response: "success", message: "Usuarios obtenidos", data: res };
  } catch (error) {
    return {
      response: "error",
      message: `Ha ocurrido un error: ${error}`,
      data: [],
    };
  }
};
