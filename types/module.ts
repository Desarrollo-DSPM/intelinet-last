import { z } from "zod";

export const formSchemaCreateModule = z.object({
  name: z.string().min(2, {
    message: "El nombre es requerido",
  }),
});

export const formSchemaEditModule = z.object({
  name: z.string().min(2, {
    message: "El nombre es requerido",
  }),
});
