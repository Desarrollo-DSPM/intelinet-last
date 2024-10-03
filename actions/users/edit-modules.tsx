"use server";

import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db/db";
import { User, users } from "@/lib/db/schema";

interface EditModulesUserProps {
  modules: string;
  id: User["id"];
}

export const editModulesUser = async ({
  modules,
  id,
}: EditModulesUserProps) => {
  try {
    await db
      .update(users)
      .set({
        modules,
      })
      .where(and(eq(users.id, id)));

    return { response: "success", message: "Actualizado" };
  } catch (error) {
    return { response: "error", message: `Ha ocurrido un error: ${error}` };
  }
};
