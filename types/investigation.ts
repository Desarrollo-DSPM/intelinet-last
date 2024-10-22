import { z } from "zod";

export const formSchemaCreateInvestigation = z.object({
  group: z.string().min(2, {
    message: "El grupo es requerido",
  }),
  supportUserId: z.coerce.number().int().positive().optional(),
  district: z.enum(["angel", "colon", "diana", "morelos", "villa", "zapata"], {
    message: "El distrito es requerido",
  }),
  investigationTypeId: z.coerce.number().int().positive().min(1, {
    message: "El tipo de investigación es requerido",
  }),
  investigationDate: z.date({
    required_error: "La fecha de la investigación es requerida",
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

export const formSchemaEditInvestigation = z.object({
  supportUserId: z.coerce.number().int().positive().optional(),
  district: z.enum(["angel", "colon", "diana", "morelos", "villa", "zapata"], {
    message: "El distrito es requerido",
  }),
  investigationTypeId: z.coerce.number().int().positive().min(1, {
    message: "El tipo de investigación es requerido",
  }),
  investigationDate: z.date({
    required_error: "La fecha de la investigación es requerida",
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
  people: z.string().optional(),
  census: z.coerce
    .number({
      required_error: "La cantidad de censos es requerida",
    })
    .int(),
  afis: z.coerce
    .number({
      required_error: "La cantidad de AFIS es requerida",
    })
    .int(),
  atecedentsAOP: z.coerce
    .number({
      required_error: "La cantidad de antecedentes AOP es requerida",
    })
    .int(),
  socialNetworks: z.string().optional(),
  peopleFiles: z.coerce
    .number({
      required_error: "La cantidad de archivos de personas es requerida",
    })
    .int(),
  comparision: z.coerce
    .number({
      required_error: "La cantidad de comparativa es requerida",
    })
    .int(),
  chronologyUAT: z.coerce
    .number({
      required_error: "La cantidad de cronología UAT es requerida",
    })
    .int(),
});
