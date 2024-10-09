import { z } from "zod";

export const formSchemaInitFormat = z.object({
    userId: z.coerce.number().int().positive().min(1, {
        message: "El usuario es requerido",
    }),
    group: z.string().min(2, {
        message: "El grupo es requerido",
    }),
    supportUserId: z.coerce.number().int().positive().optional(),
    district: z.enum(["angel", "colon", "diana", "morelos", "villa", "zapata"], {
        message: "El distrito es requerido",
    }),
    eventTypeId: z.coerce.number().int().positive().min(1, {
        message: "El tipo de evento es requerido",
    }),
    eventDate: z.date({
        required_error: "La fecha del evento es requerida",
    }),
    location: z.string().min(2, {
        message: "La ubicación es requerida",
    }),
    physicalVictim: z.string().optional(),
    moralVictim: z.string().optional(),
    callFolios: z.string().optional(),
    iphFolios: z.string().optional(),
    victimInv: z.coerce.number().int().default(0),
    witnessInv: z.coerce.number().int().default(0),
    invAccused: z.coerce.number().int().default(0),
    photoCount: z.coerce.number().int().default(0),
    videoCount: z.coerce.number().int().default(0),
});