import { format, parse } from "date-fns";
import { es } from "date-fns/locale";

export const dateFormat = (dateString: string) => {
  const parsedDate = parse(dateString, "dd/MM/yyyy", new Date());
  // Obtenemos el mes en formato abreviado
  const formattedMonth = format(parsedDate, "MMM", { locale: es });
  const formattedDate = format(parsedDate, "dd", { locale: es });
  const formattedYear = format(parsedDate, "yyyy", { locale: es });

  return `${formattedDate} ${formattedMonth}, ${formattedYear}`;
};
