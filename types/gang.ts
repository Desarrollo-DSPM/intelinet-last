import {z} from "zod";

export const formSchemaCreateGang = z.object({
  name: z.string().min(2, {
    message: "El nombre es requerido"
  }),
  location: z.string().min(2, {
    message: "La ubicación es requerida"
  }),
  members: z.coerce.number().int().min(1, {
    message: "El número de integrantes es requerido"
  })
});
