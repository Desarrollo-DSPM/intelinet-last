"use server";

import { db } from "@/lib/db/db";
import { initFormats } from "@/lib/db/schema";
import { formSchemaInitFormat } from "@/types/init-format";
import { z } from "zod";

interface CreateInitFormatProps {
    values: z.infer<typeof formSchemaInitFormat>;
}

export const createInitFormat = async ({values} : CreateInitFormatProps) => {
    try {
        const { 
            userId, group,
            supportUserId, district,
            eventTypeId, eventDate,
            location, physicalVictim,
            moralVictim, callFolios,
            iphFolios, victimInv,
            witnessInv, invAccused,
            photoCount, videoCount
        } = values;

        await db
            .insert(initFormats)
            .values({
                userId,
                group,
                supportUserId,
                district,
                eventTypeId,
                eventDate,
                location,
                physicalVictim,
                moralVictim,
                callFolios,
                iphFolios,
                victimInv,
                witnessInv,
                invAccused,
                photoCount,
                videoCount,
                createdAt: new Date(),
                updatedAt: new Date()
            });

        return { response: "success", message: "Formato de inicio creado" };
    } catch (error) {
        return { response: "error", message: `Ha ocurrido un error: ${error}` };
    }
}