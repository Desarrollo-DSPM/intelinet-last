"use server";

import { z } from "zod";
import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db/db";
import { User, users } from "@/lib/db/schema";
import { formSchemaEditRolUser } from "@/types/user";

interface EditRolUserProps {
  values: z.infer<typeof formSchemaEditRolUser>;
  id: User["id"];
}

export const editRolUser = async ({ values, id }: EditRolUserProps) => {
  try {
    await db
      .update(users)
      .set({
        role: values.role,
      })
      .where(and(eq(users.id, id)));

    return { response: "success", message: "Rol asignado" };
  } catch (error) {
    return { response: "error", message: `Ha ocurrido un error: ${error}` };
  }
};
