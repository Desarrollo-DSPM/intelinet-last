"use server";

import { db } from "@/lib/db/db";
import {
  investigations,
  investigationsTypes,
  users as createdBy,
  users as supportBy,
  User,
  InvestigationWithDetails,
} from "@/lib/db/schema";
import { eq, isNotNull, and, inArray } from "drizzle-orm";

type SupportUser = Pick<
  User,
  "id" | "employeeNumber" | "name" | "lastname" | "email" | "modules"
>;

interface getInvestigationsByGroupAndByStatusProps {
  group: string;
  status: string;
}

export const getInvestigationsByGroupAndByStatus = async ({
  group,
  status,
}: getInvestigationsByGroupAndByStatusProps) => {
  try {
    // Traer todas las investigaciones con el usuario que las creó
    const investigationsWithCreatedBy = await db
      .select({
        investigation: investigations,
        createdBy: {
          id: createdBy.id,
          employeeNumber: createdBy.employeeNumber,
          name: createdBy.name,
          lastname: createdBy.lastname,
          email: createdBy.email,
          modules: createdBy.modules,
        },
        investigationType: investigationsTypes,
      })
      .from(investigations)
      .innerJoin(createdBy, eq(investigations.userId, createdBy.id))
      .leftJoin(
        investigationsTypes,
        eq(investigations.investigationTypeId, investigationsTypes.id)
      )
      .where(
        and(eq(investigations.group, group), eq(investigations.status, status))
      );

    if (investigationsWithCreatedBy.length <= 0) {
      return { response: "error", message: "No hay investigaciones", data: [] };
    }

    // Extraer los supportUserId que no son null
    const supportUserIds = investigationsWithCreatedBy
      .filter(
        (investigation) => investigation.investigation.supportUserId !== null
      )
      .map((investigation) => investigation.investigation.supportUserId);

    // Si hay usuarios de soporte, hacer una consulta para obtener sus datos
    let supportUsers: SupportUser[] = [];
    if (supportUserIds.length > 0) {
      supportUsers = await db
        .select({
          id: supportBy.id,
          employeeNumber: supportBy.employeeNumber,
          name: supportBy.name,
          lastname: supportBy.lastname,
          email: supportBy.email,
          modules: supportBy.modules,
        })
        .from(supportBy)
        .where(
          and(
            isNotNull(supportBy.id),
            inArray(
              supportBy.id,
              supportUserIds.filter((id) => id !== null)
            )
          )
        );
    }

    // Combinar los datos de soporte con las investigaciones
    const result: InvestigationWithDetails[] = investigationsWithCreatedBy.map(
      (investigation) => {
        const supportUser = supportUsers.find(
          (user) => user.id === investigation.investigation.supportUserId
        );

        return {
          investigation: investigation.investigation,
          investigationType: investigation.investigationType,
          createdBy: investigation.createdBy,
          supportBy: supportUser || null, // Si no hay usuario de soporte, retorna null
        };
      }
    );

    return {
      response: "success",
      message: "Investigaciones obtenidas",
      data: result,
    };
  } catch (error) {
    return {
      response: "error",
      message: `Ha ocurrido un error: ${error}`,
      data: [],
    };
  }
};
