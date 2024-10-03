import { db } from "./db";
import { users, departments } from "./schema";
import { hashPassword } from "@/lib/auth/session";
import { MySqlTable, TableConfig } from "drizzle-orm/mysql-core";

async function seed() {
  const email = "admin@admin.com";
  const password = "admin123";
  const passwordHash = await hashPassword(password);

  const [department] = await db
    .insert(departments as MySqlTable<TableConfig>)
    .values([
      {
        name: "Innovación y Tecnología",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

  await db.insert(users as MySqlTable<TableConfig>).values([
    {
      departmentId: department.insertId,
      name: "Admin",
      lastname: "Admin",
      username: "admin",
      employeeNumber: 111111,
      email: email,
      password: passwordHash,
      role: "admin",
      dateOfEntry: new Date(),
      modules: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  console.log("✅ Usuario inicial creado con exito.");
}

seed()
  .catch((error) => {
    console.error("❌ El proceso de seed ha fallado:", error);
    process.exit(1);
  })
  .finally(() => {
    console.log("✅ Proceso de seed finalizado con exito.");
    process.exit(0);
  });
