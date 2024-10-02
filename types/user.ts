import { z } from "zod";

export const formSchemaLogin = z.object({
  email: z
    .string()
    .min(2, {
      message: "El email es requerido",
    })
    .email({
      message: "El email no es válido",
    }),
  password: z.string().min(8, {
    message: "La contraseña es requerida",
  }),
});

export const formSchemaRegister = z.object({
  departmentId: z.coerce.number().int().positive().min(1, {
    message: "El departamento es requerido",
  }),
  name: z.string().min(2, {
    message: "El nombre es requerido",
  }),
  lastname: z.string().min(2, {
    message: "Los apellidos son requeridos",
  }),
  email: z
    .string()
    .min(2, {
      message: "El email es requerido",
    })
    .email({
      message: "El email no es válido",
    }),
  password: z.string().min(8, {
    message: "La contraseña debe contener al menos 8 caracteres",
  }),
  employeeNumber: z.coerce.number().int().positive().min(1, {
    message: "El número de empleado es requerido",
  }),
  dateOfEntry: z.date({
    required_error: "La fecha de ingreso es requerida",
  }),
});

export const formSchemaEditUser = z.object({
  departmentId: z.coerce.number().int().positive().min(1, {
    message: "El departamento es requerido",
  }),
  name: z.string().min(2, {
    message: "El nombre es requerido",
  }),
  lastname: z.string().min(2, {
    message: "Los apellidos son requeridos",
  }),
  employeeNumber: z.coerce.number().int().positive().min(1, {
    message: "El número de empleado es requerido",
  }),
  email: z
    .string()
    .min(2, {
      message: "El email es requerido",
    })
    .email({
      message: "El email no es válido",
    }),
  password: z
    .string()
    .optional()
    .refine((value) => !value || value.length >= 8, {
      message: "La contraseña debe tener al menos 8 caracteres",
    }),
});

export const formSchemaEditRolUser = z.object({
  role: z.enum(["admin", "support", "default"], {
    message: "El rol no es válido",
  }),
});
