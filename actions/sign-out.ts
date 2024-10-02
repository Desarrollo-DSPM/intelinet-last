"use server";

import { cookies } from "next/headers";

export async function signOut() {
  cookies().delete("AUTH_SESSION_JOTREDEV");
}
