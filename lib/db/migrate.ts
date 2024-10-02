import dotenv from "dotenv";
import path from "path";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { connection, db } from "./db";
import { MySql2Database } from "drizzle-orm/mysql2/driver";

dotenv.config();

async function main() {
  const typedDb: MySql2Database<typeof import("./schema")> = db;

  await migrate(typedDb, {
    migrationsFolder: path.join(process.cwd(), "/lib/db/migrations"),
  });
  console.log(`✅ Migraciones completas.`);
  await connection.end();
}

main();
