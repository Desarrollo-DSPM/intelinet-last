import { relations } from "drizzle-orm";
import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  int,
  tinyint,
  date,
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
  modules: text("modules").notNull(),
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

export const userRelations = relations(users, ({ one, many }) => ({
  department: one(departments, {
    fields: [users.departmentId],
    references: [departments.id],
  }),
  initFormats: many(initFormats),
  initFormatsSupport: many(initFormats),
}));

export const initFormats = mysqlTable("init_formats", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id").notNull().references(() => users.id),
  group: varchar("group", { length: 255 }).notNull(),
  supportUserId: int("support_user_id").references(() => users.id),
  district: varchar("district", { length: 255 }).notNull(),
  eventTypeId: int("event_type_id").notNull().references(() => eventTypes.id),
  eventDate: date("event_date").notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  physicalVictim: varchar("physical_victim", { length: 255 }),
  moralVictim: varchar("moral_victim", { length: 255 }),
  callFolios: text("call_folios"),
  iphFolios: text("iph_folios"),
  victimInv: int("victim_inv").default(0),
  witnessInv: int("witness_inv").default(0),
  invAccused: int("inv_accused").default(0),
  photoCount: int("photo_count").default(0),
  videoCount: int("video_count").default(0),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const initFormatsRelations = relations(initFormats, ({ one }) => ({
  user: one(users, {
    fields: [initFormats.userId],
    references: [users.id],
  }),
  supportUser: one(users, {
    fields: [initFormats.supportUserId],
    references: [users.id],
  }),
  eventType: one(eventTypes, {
    fields: [initFormats.eventTypeId],
    references: [eventTypes.id],
  }),
}));

export const eventTypes = mysqlTable("event_types", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  isActive: tinyint("is_active").default(1),
});

export const eventTypesRelations = relations(eventTypes, ({ many }) => ({
  initFormats: many(initFormats),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Department = typeof departments.$inferSelect;
export type NewDepartment = typeof departments.$inferInsert;
export type UserWithDepartment = Omit<User, "departmentId" | "password"> & {
  department: string | null;
};
export type InitFormat = typeof initFormats.$inferSelect;
export type NewInitFormat = typeof initFormats.$inferInsert;
export type EventType = typeof eventTypes.$inferSelect;
export type NewEventType = typeof eventTypes.$inferInsert;
export type InitFormatWithUser = Omit<InitFormat, "userId" | "supportUserId" | "eventTypeId"> & {
  user: string;
  supportUser: string | null;
  eventTypeName: string;
};
