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
  investigationDate: date("investigation_date").notNull(),
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
  people: text("people").default("[]"),
  census: int("census").default(0),
  afis: int("afis").default(0),
  atecedentsAOP: int("atecedents_aop").default(0),
  socialNetworks: text("social_networks").default("[]"),
  peopleFiles: int("people_files").default(0),
  comparision: int("comparision").default(0),
  chronologyUAT: int("chronology_uat").default(0),
  surveillanceOperationPeople: text("surveillance_operation").default("[]"),
  searchOperationTracking: varchar("search_operation_tracking", {
    length: 255,
  }).default(""),
  searchOperationOthers: varchar("search_operation_others", {
    length: 255,
  }).default(""),
  pliceReport: int("plice_report").default(0),
  photographicSeries: int("photographic_series").default(0),
  mapUAT: int("map_uat").default(0),
  arrestOperationLocation: varchar("arrest_operation_location", {
    length: 255,
  }).default(""),
  arrestOperationDistrict: varchar("arrest_operation_district", {
    length: 255,
  }).default(""),
  arrestOperationDate: date("arrest_operation_date").default(new Date()),
  personsArrested: text("persons_arrested").default("[]"),
  arrestsInFlagranteDelicto: int("arrests_in_flagrante_delicto").default(0),
  arrestsForAdministrative: int("arrests_for_administrative").default(0),
  arrestsForTracking: int("arrests_for_tracking").default(0),
  arrestsByArrestWarrant: int("arrests_by_arrest_warrent").default(0),
  arrestsBySearchWarrant: int("arrests_by_search_warrent").default(0),
  personsLocatedUNNA: text("persons_located_unna").default("[]"),
  personsLocatedSocialWork: text("persons_located_social_work").default("[]"),
  recoveredObjectsInFlagrante: tinyint(
    "recovered_objects_in_flagrante"
  ).default(0),
  recoveredObjectsTracking: tinyint("recovered_objects_tracking").default(0),
  weaponKnife: int("weapon_knife").default(0),
  weaponRazor: int("weapon_razor").default(0),
  weaponProp: int("weapon_prop").default(0),
  weaponCustom: int("weapon_custom").default(0),
  fireArmShort: int("fire_arm_short").default(0),
  fireArmLong: int("fire_arm_long").default(0),
  fireArmProp: int("fie_arm_prop").default(0),
  fireArmCustom: int("fire_arm_custom").default(0),
  marihuanaQuantity: int("marihuana_quantity").default(0),
  marihuanaUnit: varchar("marihuana_unit", { length: 255 }).default(""),
  cocaineQuantity: int("cocaine_quantity").default(0),
  cocaineUnit: varchar("cocaine_unit", { length: 255 }).default(""),
  tabletsQuantity: int("tablets_quantity").default(0),
  tabletsUnit: varchar("tablets_unit", { length: 255 }).default(""),
  heroinQuantity: int("heroin_quantity").default(0),
  heroinUnit: varchar("heroin_unit", { length: 255 }).default(""),
  insuredVehicles: text("insured_vehicles").default("[]"),
  insuredObjects: text("insured_objects").default("[]"),
  informativeDate: int("informative_date").default(0),
  tradesMP: int("trades_mp").default(0),
  deliveryDate: date("delivery_date").default(new Date()),
  deliveryHour: varchar("delivery_hour", { length: 255 }).default(""),
  status: varchar("status", { length: 255 }).default("in-progress"),
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
