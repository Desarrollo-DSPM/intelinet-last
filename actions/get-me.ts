import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db/db";
import { users } from "@/lib/db/schema";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth/session";

// Obtener el usuario actual
export async function getUser() {
  const sessionCookie = cookies().get("AUTH_SESSION_JOTREDEV");
  if (!sessionCookie || !sessionCookie.value) {
    return null;
  }

  const sessionData = await verifyToken(sessionCookie.value);
  if (
    !sessionData ||
    !sessionData.user ||
    typeof sessionData.user.id !== "number"
  ) {
    return null;
  }

  if (new Date(sessionData.expires) < new Date()) {
    return null;
  }

  const user = await db
    .select()
    .from(users)
    .where(and(eq(users.id, sessionData.user.id), eq(users.isActive, 1)))
    .limit(1);

  if (user.length === 0) {
    return null;
  }

  return user[0];
}
