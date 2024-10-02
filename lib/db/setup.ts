import { promises as fs } from "node:fs";
import readline from "node:readline";
import crypto from "node:crypto";
import path from "node:path";

function question(query: string, hideInput = false): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  if (hideInput) {
    // Oculta la entrada deshabilitando la salida estándar
    process.stdout.write(query);
    process.stdin.on("keypress", () => {
      readline.moveCursor(
        (rl as readline.Interface & { output: NodeJS.WritableStream }).output,
        -1,
        0
      );
      (
        rl as readline.Interface & { output: NodeJS.WritableStream }
      ).output.write("*");
    });
  }

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}

async function getHostMySQL(): Promise<string> {
  console.log("Paso 1: Configurar MySQL");
  const dbChoice = await question(
    "¿Ya tienes tu base de datos en MySQL? (Y/N):"
  );

  if (dbChoice.toLowerCase() === "y") {
    return await question("DB_HOST: ");
  } else {
    console.log(
      "Debes tener tu base de datos en MySQL para continuar con la instalación."
    );
    process.exit(1);
  }
}

async function getNameDBMySQL(): Promise<string> {
  return await question("DB_NAME: ");
}

async function getUserDBMySQL(): Promise<string> {
  return await question("DB_USER: ");
}

async function getPasswordDBMySQL(): Promise<string> {
  return await question("DB_PASSWORD: ", true);
}

async function getPortDBMySQL(): Promise<string> {
  return await question("DB_PORT: ", false);
}

function generateAuthSecret(): string {
  console.log("Paso 2: Generando AUTH_SECRET...");
  return crypto.randomBytes(32).toString("hex");
}

async function writeEnvFile(envVars: Record<string, string>) {
  console.log("Paso 3: Escribiendo variables de entorno en .env...");
  const envContent = Object.entries(envVars)
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  await fs.writeFile(path.join(process.cwd(), ".env"), envContent);
  console.log(".env archivo creado con las variables necesarias.");
}

async function main() {
  const DB_HOST = await getHostMySQL();
  const DB_NAME = await getNameDBMySQL();
  const DB_USER = await getUserDBMySQL();
  const DB_PASSWORD = await getPasswordDBMySQL();
  const DB_PORT = await getPortDBMySQL();
  const BASE_URL = "http://localhost:3000";
  const AUTH_SECRET = generateAuthSecret();

  await writeEnvFile({
    DB_HOST,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_PORT,
    BASE_URL,
    AUTH_SECRET,
  });

  console.log("✅ Configuración completada!");
}

main().catch(console.error);
