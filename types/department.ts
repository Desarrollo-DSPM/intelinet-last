import { z } from "zod";

export const formSchemaCreateDepartment = z.object({
  name: z.string().min(2, {
    message: "El nombre es requerido",
  }),
});

export const formSchemaEditDepartment = z.object({
  name: z.string().min(2, {
    message: "El nombre es requerido",
  }),
});
