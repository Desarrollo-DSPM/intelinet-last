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
  investigations: many(investigations),
  investigationsSupport: many(investigations),
}));

export const investigations = mysqlTable("investigations", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id")
    .notNull()
    .references(() => users.id),
  group: varchar("group", { length: 255 }).notNull(),
  supportUserId: int("support_user_id").references(() => users.id),
  district: varchar("district", { length: 255 }).notNull(),
  investigationTypeId: int("investigation_type_id")
    .notNull()
    .references(() => investigationsTypes.id),
  investigationDate: varchar("investigation_date", { length: 50 }).notNull(),
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
  people: text("people"),
  census: int("census").default(0),
  afis: int("afis").default(0),
  atecedentsAOP: int("atecedents_aop").default(0),
  socialNetworks: text("social_networks"),
  peopleFiles: int("people_files").default(0),
  comparision: int("comparision").default(0),
  chronologyUAT: int("chronology_uat").default(0),
  surveillanceOperationPeople: int("surveillance_operation_people").default(0),
  surveillanceOperationVehicles: int("surveillance_operation_vehicles").default(
    0
  ),
  surveillanceOperationAdressess: int(
    "surveillance_operation_addresses"
  ).default(0),
  searchOperationTracking: int("search_operation_tracking").default(0),
  searchOperationOthers: int("search_operation_others").default(0),
  pliceReport: int("plice_report").default(0),
  photographicSeries: int("photographic_series").default(0),
  mapUAT: int("map_uat").default(0),
  arrestOperationLocation: varchar("arrest_operation_location", {
    length: 255,
  }),
  arrestOperationDistrict: varchar("arrest_operation_district", {
    length: 255,
  }),
  arrestOperationDate: varchar("arrest_operation_date", { length: 50 }).default(
    ""
  ),
  personsArrested: text("persons_arrested"),
  arrestsInFlagranteDelicto: int("arrests_in_flagrante_delicto").default(0),
  arrestsForAdministrative: int("arrests_for_administrative").default(0),
  arrestsForTracking: int("arrests_for_tracking").default(0),
  arrestsByArrestWarrant: int("arrests_by_arrest_warrent").default(0),
  arrestsBySearchWarrant: int("arrests_by_search_warrent").default(0),
  personsLocatedUNNA: int("persons_located_unna").default(0),
  personsLocatedSocialWork: int("persons_located_social_work").default(0),
  recoveredObjects: text("recovered_objects"),
  securedDrug: text("secured_drug"),
  securedVehicles: text("secured_vehicles"),
  securedObjects: text("secured_objects"),
  informativeSheet: int("informative_sheet").default(0),
  officesMP: int("offices_mp").default(0),
  deliveryDate: varchar("delivery_date", { length: 50 }),
  deliveryHour: varchar("delivery_hour", { length: 50 }),
  status: varchar("status", { length: 255 }).default("in-progress"),
  shared: tinyint("shared").default(0),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const investigationsRelations = relations(investigations, ({ one }) => ({
  user: one(users, {
    fields: [investigations.userId],
    references: [users.id],
  }),
  supportUser: one(users, {
    fields: [investigations.supportUserId],
    references: [users.id],
  }),
  investigationsTypes: one(investigationsTypes, {
    fields: [investigations.investigationTypeId],
    references: [investigationsTypes.id],
  }),
}));

export const investigationsTypes = mysqlTable("investigations_types", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  isActive: tinyint("is_active").default(1),
});

export const investigationsTypesRelations = relations(
  investigationsTypes,
  ({ many }) => ({
    investigations: many(investigations),
  })
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Department = typeof departments.$inferSelect;
export type NewDepartment = typeof departments.$inferInsert;
export type UserWithDepartment = Omit<User, "departmentId" | "password"> & {
  department: string | null;
};
export type Investigation = typeof investigations.$inferSelect;
export type NewInvestigation = typeof investigations.$inferInsert;
export type InvestigationType = typeof investigationsTypes.$inferSelect;
export type NewInvestigationType = typeof investigationsTypes.$inferInsert;
export type InvestigationWithDetails = {
  investigation: Investigation;
  investigationType: InvestigationType | null;
  createdBy: Pick<
    User,
    "id" | "employeeNumber" | "name" | "lastname" | "email" | "modules"
  >;
  supportBy: Pick<
    User,
    "id" | "employeeNumber" | "name" | "lastname" | "email" | "modules"
  > | null;
};
