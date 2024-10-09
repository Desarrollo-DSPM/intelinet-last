"use server";

import { db } from "@/lib/db/db";
import { eq } from "drizzle-orm";

import { EventType, eventTypes } from "@/lib/db/schema";

export const getAllEventTypes = async () => {
    try {
        const res: EventType[] = await db
            .select()
            .from(eventTypes)
            .where(eq(eventTypes.isActive, 1));

        if (res.length <= 0) {
            return {
                response: "error",
                message: "Tipo de evento no encontrado",
                data: [],
            };
        }
        return {
            response: "success",
            message: "Tipos de evento obtenidos",
            data: res,
        };
    } catch (error) {
        return {
            response: "error",
            message: `Ha ocurrido un error: ${error}`,
            data: [],
        };
    }
};