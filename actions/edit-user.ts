"use server";

import { z } from "zod";
import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db/db";
import { User, users } from "@/lib/db/schema";
import { hashPassword } from "@/lib/auth/session";

import { formSchemaEditUser } from "@/types/user";

interface EditUserProps {
  values: z.infer<typeof formSchemaEditUser>;
  id: User["id"];
}

export const editUser = async ({ values, id }: EditUserProps) => {
  try {
    const { departmentId, name, lastname, employeeNumber, email } = values;

    if (values.password && values.password !== "") {
      const passwordHash = await hashPassword(values.password);

      await db
        .update(users)
        .set({
          departmentId,
          name,
          lastname,
          employeeNumber,
          email,
          password: passwordHash,
        })
        .where(and(eq(users.id, id)));
    } else {
      await db
        .update(users)
        .set({ departmentId, name, lastname, email, employeeNumber })
        .where(and(eq(users.id, id)));
    }

    return { response: "success", message: "Usuario editado" };
  } catch (error) {
    return { response: "error", message: `Ha ocurrido un error: ${error}` };
  }
};
