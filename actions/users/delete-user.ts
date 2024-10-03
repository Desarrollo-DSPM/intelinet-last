"use server";

import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db/db";
import { User, users } from "@/lib/db/schema";

interface DeleteUserProps {
  id: User["id"];
}

export const deleteUser = async ({ id }: DeleteUserProps) => {
  try {
    const user = await db.query.users.findFirst({
      where: and(eq(users.id, id)),
    });

    if (!user) {
      return {
        response: "error",
        message: "Usuario no encontrado",
        data: null,
      };
    }

    // Borrado logico
    await db
      .update(users)
      .set({
        isActive: 0,
      })
      .where(and(eq(users.id, id)));

    return { response: "success", message: "Usuario eliminado" };
  } catch (error) {
    return { response: "error", message: `Ha ocurrido un error: ${error}` };
  }
};
