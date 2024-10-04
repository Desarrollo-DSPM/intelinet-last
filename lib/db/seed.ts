import { db } from "./db";
import { users, departments, eventTypes } from "./schema";
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
      modules: "[]",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  await db.insert(eventTypes as MySqlTable<TableConfig>).values([
    {
      name: "ABANDONO DE PERSONA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ABORTO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ABORTO ESPONTANEO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ABUSO DE AUTORIDAD",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ABUSO DE CONFIANZA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "ABUSO SEXUAL", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "ACCIDENTE ACUÁTICO CON LESIONADOS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ACCIDENTE DE AERONAVE CON FALLECIDO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ACCIDENTE DE MOTOCICLETA CON LESIONADOS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ACCIDENTE DE TRÁNSITO CON MUERTOS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ACCIDENTE DE TRÁNSITO SIN LESIONADOS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ACCIDENTE DE VEHÍCULO AUTOMOTOR CON LESIONADOS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ACCIDENTE MÚLTIPLE CON FALLECIDO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ACCIDENTE MÚLTIPLE CON LESIONADOS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ACCIDENTES CON MATERIALES PELIGROSOS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ACOSO CALLEJERO A TRAVÉS DE PALABRAS SOECES",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ACOSO U HOSTIGAMIENTO SEXUAL",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ACTIVACIÓN DE ALARMA EN ESCUELA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ACTOS CONTRA LA DIGNIDAD PERSONAL DE LA AUTORIDAD TANTO FÍSICA COMO VERBAL",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "AERONAVE SOSPECHOSA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "AGRESIÓN EN CONTRA DE LA MUJER",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "AGRESIÓN FÍSICA", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "AGRESIÓN FÍSICA EN PANDILLA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "AGRESIÓN VERBAL", createdAt: new Date(), updatedAt: new Date() },
    { name: "AHOGAMIENTO", createdAt: new Date(), updatedAt: new Date() },
    { name: "ALARMA ACTIVADA", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "ALLANAMIENTO DE MORADA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ALTERACIÓN DEL ORDEN PÚBLICO POR PERSONA ALCOHOLIZADA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ALTERACIÓN DEL ORDEN PÚBLICO POR PERSONA DROGADA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ALTERAR EL ORDEN PUBLICO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "AMENAZA", createdAt: new Date(), updatedAt: new Date() },
    { name: "AMENAZA DE BOMBA", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "AMENAZA DE SUICIDIO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "ANIMAL PELIGROSO", createdAt: new Date(), updatedAt: new Date() },
    { name: "ANIMALES SUELTOS", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "APOYO A LA CIUDADANÍA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "APOYO A UNIDAD DE VIALIDAD",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ÁRBOL CAÍDO O POR CAER",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ARRANCONES O CARRERAS DE VEHÍCULOS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ARRESTO POR MEDIO DE APREMIO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ARROJAR A LA VÍA PÚBLICA AGUA SUCIA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ARROJAR CONTRA UNA PERSONA LÍQUIDOS U OBJETOS QUE OCASIONES MOLESTIAS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ARROJAR EN VÍA PÚBLICA LÍQUIDOS U OBJETOS QUE OCASIONES MOLESTIAS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ASEGURAMIENTO DE ARMA DE FUEGO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ASEGURAMIENTO DE EVIDENCIA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ASEGURAMIENTO DE OSAMENTA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ASESORÍA A CIUDADANO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "ASFIXIA", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "ASOCIACIÓN DELICTUOSA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "ATAQUES AL PUDOR", createdAt: new Date(), updatedAt: new Date() },
    { name: "ATROPELLAMIENTO", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "AYUDA O INDUCCIÓN AL SUICIDIO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "BLOQUEO O CORTE DE VÍAS DE COMUNICACIÓN",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "BOTÓN DE EMERGENCIA ACTIVADO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "CABLES COLGANDO", createdAt: new Date(), updatedAt: new Date() },
    { name: "CAÍDA", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "CAÍDA DE ANUNCIO O ESPECTACULAR",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "CAÍDA DE BARDA", createdAt: new Date(), updatedAt: new Date() },
    { name: "CAÍDA DE POSTE", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "CANALIZACIÓN A LA UNNA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "CANALIZACIÓN A OTRA INSTANCIA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "CANALIZACIÓN A TRABAJO SOCIAL",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "CAUSAR ESCÁNDALOS EN LUGARES PÚBLICOS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "CAUSAR MOLESTIAS", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "CAUSAR PÁNICO A LA CIUDADANÍA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "CIRCULAR EN VEHÍCULOS CON SIRENAS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "COHECHO", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "COMERCIALIZACIÓN ILEGAL DE SANGRE, ÓRGANOS Y TEJIDOS HUMANOS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "CONCENTRACIÓN PACÍFICA DE PERSONAS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "CONSUMO DE ALCOHOL EN ESCUELA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "CONSUMO DE DROGAS EN ESCUELA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "CONSUMO DE DROGAS EN VÍA PÚBLICA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "CONTAMINACIÓN DE SUELO Y AÍRE",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "CONVULSIONES", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "CORRUPCIÓN DE MENORES",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "CORTO CIRCUITO", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "CRISTALAZO O ROBO AL INTERIOR DE VEHÍCULO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "DAÑAR", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "DAÑOS A BIENES PÚBLICOS, INSTITUCIONES, MONUMENTOS, ENTRE OTROS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "DAÑOS A CASA HABITACIÓN",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "DAÑOS A LOCAL COMERCIAL",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "DAÑOS A PLANTAS", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "DAÑOS A PROPIEDAD PARTICULAR",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "DAÑOS A VEHÍCULO", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "DELITOS CONTRA LA SALUD",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "DELITOS ELECTORALES",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "DESAPARICIÓN FORZADA DE PERSONAS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "DESCOMPENSACIÓN DE LA DIABETES/DESHIDRATACIÓN",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "DESOBEDIENCIA Y RESISTENCIA DE PARTICULARES",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "DESPOJO", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "DIFICULTAD RESPIRATORIA/URGENCIA RESPIRATORIA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "DISPARAR ARMAS DE FUEGO FUERA DE LUGARES PERMITIDOS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "DOLOR ABDOMINAL/URGENCIA ABDOMINAL",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "DORMIR EN LUGARES PÚBLICOS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ELECTROCUTADO/LESIÓN POR CORRIENTE ELÉCTRICA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ENCUBRIMIENTO POR RECEPTACIÓN",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ENJAMBRE DE ABEJAS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ENTORPECER LABORES DE LA AUTORIDAD",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ENTREVISTA A QUEJOSO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "ESTUPRO", createdAt: new Date(), updatedAt: new Date() },
    { name: "EXPLOSIÓN", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "EXPLOTACIÓN DE MENORES",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "EXTORSIÓN", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "EXTORSIÓN TELEFÓNICA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "EXTRAVÍO DE PLACA VEHICULAR",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "FALLECIDO DE CAUSA NATURAL",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "FALLECIDO DE CAUSA TRAUMÁTICA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "FALSIFICACIÓN DE DOCUMENTOS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "FALTA DE RESPETO", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "FALTAR AL RESPETO AL PÚBLICO ASISTENTE A EVENTOS O ESPECTÁCULOS CON AGRESIONES VERBALES",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "FEMINICIDIO", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "FRACTURADO/TRAUMATISMO DE EXTREMIDADES",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "FRAUDE", createdAt: new Date(), updatedAt: new Date() },
    { name: "FUGA DE GAS", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "FUGA DE MENORES DE HOGAR",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "FUGA DE REOS", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "FUGAS Y DERRAMES DE SUSTANCIAS QUÍMICAS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "FUGAS Y DERRAMES EN ESCUELA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "FUMAR EN LUGARES PROHIBIDOS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "HECHO QUE PUEDE O NO SER CONSTITUTIVO DE DELITO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "HEMORRAGIA", createdAt: new Date(), updatedAt: new Date() },
    { name: "HIPOTERMIA", createdAt: new Date(), updatedAt: new Date() },
    { name: "HOMICIDIO CULPOSO", createdAt: new Date(), updatedAt: new Date() },
    { name: "HOMICIDIO DOLOSO", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "INCENDIO DE CASA HABITACIÓN",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "INCENDIO DE COMERCIO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "INCENDIO DE EDIFICIO PÚBLICO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "INCENDIO DE FÁBRICA O INDUSTRIA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "INCENDIO DE VEHÍCULO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "INCESTO", createdAt: new Date(), updatedAt: new Date() },
    { name: "INCINERAR LLANTAS", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "INCUMPLIMIENTO OBLIGACIONES FAMILIARES",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "INFARTO/URGENCIA CARDIOLÓGICA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "INGERIR BEBIDAS ALCOHÓLICAS EN VÍA PÚBLICA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "INSPECCIONES", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "INSULTOS POR ADULTOS/LLAMADA OBSCENA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "INTOXICACIÓN ETÍLICA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "INTOXICACIÓN MEDICAMENTOSA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "INTOXICACIÓN POR QUÍMICOS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "INTOXICACIÓN/SOBREDOSIS/ENVENENAMIENTO POR SUSTANCIAS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "LENOCINIO", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "LESIONES POR ARMA BLANCA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "LESIONES POR PROYECTIL DE ARMA DE FUEGO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "LLAMADA DE BROMA POR NIÑOS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "LLAMADA DE PRUEBA", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "LLAMADA INCOMPLETA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "LOCALIZACIÓN DE OSAMENTA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "MALTRATO DE ANIMALES",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "MALTRATO INFANTIL", createdAt: new Date(), updatedAt: new Date() },
    { name: "MENOR EXTRAVIADO", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "MORDEDURA DE ANIMAL",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "MOVILIZACIÓN DE UNIDADES EN FALSO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "NARCOMANTA", createdAt: new Date(), updatedAt: new Date() },
    { name: "NARCOMENUDEO", createdAt: new Date(), updatedAt: new Date() },
    { name: "NO ESPECIFICADO", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "NOTIFICACIÓN DE CIBER INCIDENTE",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "NOVEDADES DEL TURNO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "OBJETO SOSPECHOSO O PELIGROSO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "OBJETOS ASEGURADOS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "OBSTRUIR LAS ACERAS DE LAS CALLES",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "OFRECER O VENDER BOLETOS DE ESPECTÁCULOS CON PRECIOS SUPERIOR",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "OLORES FÉTIDOS", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "OMISIÓN DE AUXILIO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "OMISIÓN DE CUIDADOS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "OPERACIONES CON RECURSOS DE PROCEDENCIA ILÍCITA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ORINAR O DEFECAR EN LUGARES NO AUTORIZADOS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "OTRAS LLAMADAS IMPROCEDENTES",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "OTROS ACCIDENTES CON LESIONADOS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "OTROS ACTOS RELACIONADOS CON EL PATRIMONIO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "OTROS ACTOS RELACIONADOS CON LA FAMILIA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "OTROS ACTOS RELACIONADOS CON LA LIBERTAD PERSONAL",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "OTROS ACTOS RELACIONADOS CON LA LIBERTAD Y LA SEGURIDAD SEXUAL",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "OTROS ACTOS RELACIONADOS CON LA SEGURIDAD COLECTIVA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "OTROS ACTOS RELACIONADOS CON LA VIDA Y LA INTEGRIDAD PERSONAL",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "OTROS ACTOS RELACIONADOS CON OTROS BIENES JURÍDICOS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "OTROS INCENDIOS", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "OTROS INCIDENTES MÉDICOS CLÍNICOS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "OTROS INCIDENTES MÉDICOS TRAUMÁTICOS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "PENETRAR EN LUGARES PRIVADOS SIN AUTORIZACIÓN",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "PENETRAR EN LUGARES PÚBLICOS SIN AUTORIZACIÓN",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "PERNOCTAR", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "PERSONA ABANDONADA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "PERSONA AGRESIVA", createdAt: new Date(), updatedAt: new Date() },
    { name: "PERSONA EBRIA", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "PERSONA EN CRISIS POR TRASTORNO MENTAL",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "PERSONA EN SITUACIÓN DE CALLE",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "PERSONA EXHIBICIONISTA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "PERSONA EXTRAVIADA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "PERSONA INCONSCIENTE/URGENCIA NEUROLÓGICA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "PERSONA INTOXICADA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "PERSONA LOCALIZADA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "PERSONA NO LOCALIZADA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "PERSONA SIN VIDA", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "PERSONA SOSPECHOSA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "PERSONA TIRADA EN VÍA PÚBLICA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "PERSONAS ARMADAS", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "PORTACIÓN DE ARMAS DE FUEGO O CARTUCHOS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "PORTAR O UTILIZAR SIN PRECAUCIÓN OBJETOS O SUSTANCIAS PELIGROSAS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "PORTAR O VENDER A MENORES OBJETOS PELIGROSOS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "POSESIÓN DE VEHÍCULO CON REPORTE DE ROBO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "PRIVACIÓN DE LA LIBERTAD",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "PROBLEMA ENTRE ARRENDADOR Y ARRENDATARIO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "PROBLEMA ENTRE CIUDADANOS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "PROBLEMA ENTRE VECINOS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "PROFANAR TUMBAS/CADÁVER",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "PROPINAR A UNA PERSONA GOLPES QUE NO CAUSEN LESIÓN",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "QUEJA CONTRA SERVIDORES PÚBLICOS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "QUEMADURAS", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "REALIZAR TOCAMIENTOS EN SU PROPIA PERSONA CON INTENCIONES LASCIVAS EN LUGAR PÚBLICO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "RECORRIDO ATENCIÓN CIUDADANA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "RECORRIDO ESCUELAS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "RECORRIDO ESPECIAL",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "RESCATE", createdAt: new Date(), updatedAt: new Date() },
    { name: "RESCATE ANIMAL", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "RETIRO DE PERTENENCIAS DE DOMICILIO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "REVISAR DOMICILIO", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "REVISAR LOCAL COMERCIAL",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "REVISIÓN A PERSONAS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "REVISIÓN DE VEHÍCULO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "RIÑA", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "ROBO A BANCO CON VIOLENCIA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ROBO A BANCO SIN VIOLENCIA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ROBO A BIENES PÚBLICOS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "ROBO A BODEGA", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "ROBO A CAJERO AUTOMÁTICO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ROBO A CASA HABITACIÓN CON VIOLENCIA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ROBO A CASA HABITACIÓN SIN VIOLENCIA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ROBO A CENTRO RELIGIOSO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ROBO A CONSTRUCCIÓN",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ROBO A EMBARCACIONES Y PIRATERÍA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ROBO A EMPRESA DE TRASLADO DE VALORES CON VIOLENCIA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ROBO A EMPRESA DE TRASLADO DE VALORES SIN VIOLENCIA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ROBO A ESCUELA CON VIOLENCIA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ROBO A ESCUELA SIN VIOLENCIA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ROBO A FERROCARRIL",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ROBO A GRANJA O RANCHO CON VIOLENCIA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ROBO A GRANJA O RANCHO SIN VIOLENCIA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ROBO A LOCAL COMERCIAL CON VIOLENCIA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ROBO A LOCAL COMERCIAL SIN VIOLENCIA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ROBO A LOCAL COMERCIAL SIN VIOLENCIA FARDERO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ROBO A TRANSEÚNTE CON VIOLENCIA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ROBO A TRANSEÚNTE SIN VIOLENCIA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ROBO A TRANSPORTE ESCOLAR CON VIOLENCIA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ROBO A TRANSPORTE ESCOLAR SIN VIOLENCIA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ROBO A TRANSPORTISTA CON VIOLENCIA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ROBO A TRANSPORTISTA SIN VIOLENCIA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ROBO DE ARMA DE FUEGO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "ROBO DE ARTE", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "ROBO DE AUTOPARTES O ACCESORIOS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "ROBO DE CABLEADO", createdAt: new Date(), updatedAt: new Date() },
    { name: "ROBO DE COBRE", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "ROBO DE COMBUSTIBLE O TOMA CLANDESTINA DE DUCTOS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "ROBO DE GANADO", createdAt: new Date(), updatedAt: new Date() },
    { name: "ROBO DE INFANTE", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "ROBO DE MAQUINARIA AGRÍCOLA O CONSTRUCCIÓN",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ROBO DE MUNICIONES O CARTUCHOS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ROBO DE PLACA VEHICULAR",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ROBO DE PLACAS OFICIALES",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ROBO DE VEHÍCULO CON VIOLENCIA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ROBO DE VEHÍCULO SIN VIOLENCIA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ROBO EN TRANSPORTE PÚBLICO COLECTIVO CON VIOLENCIA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ROBO EN TRANSPORTE PÚBLICO COLECTIVO SIN VIOLENCIA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "SECUESTRO", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "SEGUIMIENTO DE ACTAS Y REPORTES",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "SOLICITUD DE RONDÍN",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "SUICIDIO", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "SUSTRACCIÓN DE MENORES",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "TALA ILEGAL", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "TENER EXHIBICIONES O RELACIONES SEXUALES EN VÍA PÚBLICA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "TENTATIVA DE ABUSO SEXUAL",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "TENTATIVA DE HOMICIDIO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "TENTATIVA DE PRIVACIÓN DE LA LIBERTAD",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "TENTATIVA DE ROBO CON VIOLENCIA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "TENTATIVA DE ROBO SIN VIOLENCIA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "TENTATIVA DE VIOLACIÓN",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "TERRORISMO O ATENTADO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "TOMA DE EDIFICIO PÚBLICO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "TOMA DE INSTALACIONES EDUCATIVAS CON VIOLENCIA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "TOMA DE REHENES", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "TOMA ILEGAL DE ELECTRICIDAD",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "TRÁFICO DE ARMAS", createdAt: new Date(), updatedAt: new Date() },
    { name: "TRÁFICO DE MADERA", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "TRÁFICO DE MENORES",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "TRÁFICO DE PERSONAS/INDOCUMENTADAS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "TRÁFICO Y/O VENTA CLANDESTINA DE ANIMALES",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "TRANSPORTE ILEGAL DE COMBUSTIBLE",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "TRATA DE MENORES", createdAt: new Date(), updatedAt: new Date() },
    { name: "TRATA DE PERSONAS", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "TRAUMATISMO DE CRÁNEO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "TRAUMATISMO GENITAL Y/O URINARIO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "TRAUMATISMOS MÚLTIPLES",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "TREPAR BARDAS", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "URGENCIA EN PACIENTE EMBARAZADA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "URGENCIA POR ENFERMEDAD GENERAL",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "USO DE BOMBA MOLOTOV",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "USO DE DOCUMENTOS FALSOS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "USURPACIÓN DE IDENTIDAD",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "VEHÍCULO ABANDONADO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "VEHÍCULO ASEGURADO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "VEHÍCULO EN HUIDA", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "VEHÍCULO INCENDIADO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "VEHÍCULO RECUPERADO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "VEHÍCULO SOSPECHOSO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "VENTA CLANDESTINA DE PIROTECNIA, COHETES O FUEGOS ARTIFICIALES",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "VENTA ILEGAL DE COMBUSTIBLE",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "VIOLACIÓN", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "VIOLENCIA CONTRA LA MUJER",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "VIOLENCIA DE GENERO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "VIOLENCIA DE PAREJA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "VIOLENCIA FAMILIAR",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
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
