"use server";

import { db } from "@/lib/db/db";
import {
  investigations,
  investigationsTypes,
  users as createdBy,
  users as supportBy,
  User,
  InvestigationWithDetails,
  Investigation,
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";

type SupportUser = Pick<
  User,
  "id" | "employeeNumber" | "name" | "lastname" | "email" | "modules"
>;

interface GetInvestigationsByIdProps {
  id: Investigation["id"];
}

export const getInvestigationsById = async ({
  id,
}: GetInvestigationsByIdProps) => {
  try {
    // Traer una investigación por su ID con el usuario que la creó
    const investigationWithDetails = await db
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
      .where(eq(investigations.id, id))
      .limit(1);

    if (investigationWithDetails.length === 0) {
      return {
        response: "error",
        message: "Investigación no encontrada",
        data: null,
      };
    }

    const investigationData = investigationWithDetails[0];

    // Si hay un usuario de soporte, traer sus datos
    let supportUser: SupportUser | null = null;
    if (investigationData.investigation.supportUserId) {
      const supportUserData = await db
        .select({
          id: supportBy.id,
          employeeNumber: supportBy.employeeNumber,
          name: supportBy.name,
          lastname: supportBy.lastname,
          email: supportBy.email,
          modules: supportBy.modules,
        })
        .from(supportBy)
        .where(eq(supportBy.id, investigationData.investigation.supportUserId))
        .limit(1);

      supportUser = supportUserData[0] || null;
    }

    // Construir el resultado final
    const result: InvestigationWithDetails = {
      investigation: investigationData.investigation,
      investigationType: investigationData.investigationType,
      createdBy: investigationData.createdBy,
      supportBy: supportUser,
    };

    return {
      response: "success",
      message: "Investigación obtenida",
      data: result,
    };
  } catch (error) {
    return {
      response: "error",
      message: `Ha ocurrido un error: ${error}`,
      data: null,
    };
  }
};
