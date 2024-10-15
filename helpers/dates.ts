import { format, toZonedTime } from "date-fns-tz";
import { es } from "date-fns/locale";

export const dateFormat = (date: Date): string | undefined => {
  const timeZone = "America/Mexico_City"; // Cambia esto a tu zona horaria
  const dateString = date.toISOString(); // Convierte el objeto Date a string
  const dateObject = new Date(dateString);
  const zonedDate = toZonedTime(dateObject, timeZone);

  return format(zonedDate, "d MMM, yyyy", { locale: es }); // Formato "15 oct, 2024"
};
