"use server";

import { z } from "zod";
import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db/db";
import { users } from "@/lib/db/schema";
import { comparePasswords, setSession } from "@/lib/auth/session";

import { formSchemaLogin } from "@/types/user";

export const signIn = async (values: z.infer<typeof formSchemaLogin>) => {
  try {
    const { email, password } = values;

    const user = await db
      .select()
      .from(users)
      .where(and(eq(users.email, email), eq(users.isActive, 1)))
      .limit(1);

    if (user.length === 0) {
      return { response: "error", message: "Usuario no encontrado" };
    }

    const isPasswordValid = await comparePasswords(password, user[0].password);

    if (!isPasswordValid) {
      return {
        response: "error",
        message:
          "Correo electrónico o contraseña no válidos. Por favor, inténtalo de nuevo.",
      };
    }

    await setSession(user[0]);
    return { response: "success", message: "Inicio de sesión correcto" };
  } catch (error) {
    return { response: "error", message: `Ha ocurrido un error: ${error}` };
  }
};
