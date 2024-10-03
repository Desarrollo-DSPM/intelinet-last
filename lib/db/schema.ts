import { relations } from "drizzle-orm";
import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  int,
  tinyint,
  date,
  json,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  departmentId: int("department_id")
    .notNull()
    .references(() => departments.id),
  name: varchar("name", { length: 100 }),
  lastname: varchar("lastname", { length: 100 }),
  username: varchar("username", { length: 100 }).notNull().unique(),
  employeeNumber: int("employee_number").notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  role: varchar("role", { length: 20 }).notNull().default("default"),
  modules: json("modules").notNull(),
  image: varchar("image", { length: 255 }),
  dateOfBirth: timestamp("date_of_birth"),
  dateOfEntry: date("date_of_entry").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  isActive: tinyint("is_active").default(1),
});

export const departments = mysqlTable("departments", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 100 }),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  isActive: tinyint("is_active").default(1),
});

export const userRelations = relations(users, ({ one }) => ({
  department: one(departments, {
    fields: [users.departmentId],
    references: [departments.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Department = typeof departments.$inferSelect;
export type NewDepartment = typeof departments.$inferInsert;
export type UserWithDepartment = Omit<User, "departmentId" | "password"> & {
  department: string | null;
};
