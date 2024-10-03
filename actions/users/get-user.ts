"use server";

import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db/db";
import { User, users } from "@/lib/db/schema";

export async function getUserById(id: User["id"]) {
  try {
    const user = await db.query.users.findFirst({
      where: and(eq(users.id, id), eq(users.isActive, 1)),
    });

    if (!user) {
      return {
        response: "error",
        message: "Usuario no encontrado",
        data: null,
      };
    }

    return {
      response: "success",
      message: "Usuario encontrado",
      data: user,
    };
  } catch (error) {
    return {
      response: "error",
      message: `Ha ocurrido un error: ${error}`,
      data: null,
    };
  }
}
