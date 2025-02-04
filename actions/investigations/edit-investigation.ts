"use server";

import { db } from "@/lib/db/db";
import {
  Investigation,
  investigations,
  InvestigationWithDetails,
} from "@/lib/db/schema";
import { formSchemaEditInvestigation } from "@/types/investigation";
import { format } from "date-fns";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getUser } from "@/actions/users/get-me";

interface EditInvesigationProps {
  createdById: InvestigationWithDetails["createdBy"]["id"];
  id: Investigation["id"];
  values: z.infer<typeof formSchemaEditInvestigation>;
}

export const editInvestigation = async ({
  createdById,
  id,
  values,
}: EditInvesigationProps) => {
  const userSession = await getUser();

  // Validamos que el usuario de la sesión sea el creador de la investigación o un admin
  if (userSession?.id !== createdById && userSession?.role !== "admin") {
    return {
      response: "error",
      message: "No tienes permisos para editar la investigación",
    };
  }

  try {
    const {
      supportUserId,
      district,
      investigationTypeId,
      investigationDate,
      location,
      physicalVictim,
      moralVictim,
      callFolios,
      iphFolios,
      victimInv,
      witnessInv,
      invAccused,
      photoCount,
      videoCount,
      people,
      census,
      afis,
      atecedentsAOP,
      socialNetworks,
      peopleFiles,
      comparision,
      chronologyUAT,
      surveillanceOperationPeople,
      surveillanceOperationVehicles,
      surveillanceOperationAdressess,
      searchOperationTracking,
      searchOperationOthers,
      pliceReport,
      photographicSeries,
      mapUAT,
      arrestOperationLocation,
      arrestOperationDistrict,
      arrestOperationDate,
      personsArrested,
      arrestsInFlagranteDelicto,
      arrestsForAdministrative,
      arrestsForTracking,
      arrestsByArrestWarrant,
      arrestsBySearchWarrant,
      personsLocatedUNNA,
      personsLocatedSocialWork,
      recoveredObjects,
      securedDrug,
      securedVehicles,
      securedObjects,
      informativeSheet,
      officesMP,
      deliveryDate,
      deliveryHour,
    } = values;

    // Formateamos las fechas a dd/MM/yyyy
    const formattedDate = format(new Date(investigationDate), "dd/MM/yyyy");
    let arrestOperationDateFormatted = "";

    if (arrestOperationDate) {
      arrestOperationDateFormatted = format(
        new Date(arrestOperationDate),
        "dd/MM/yyyy"
      );
    }

    let deliveryDateFormatted = "";

    if (deliveryDate) {
      deliveryDateFormatted = format(new Date(deliveryDate), "dd/MM/yyyy");
    }

    await db
      .update(investigations)
      .set({
        supportUserId,
        district,
        investigationTypeId,
        investigationDate: formattedDate.toString(),
        location,
        physicalVictim,
        moralVictim,
        callFolios,
        iphFolios,
        victimInv,
        witnessInv,
        invAccused,
        photoCount,
        videoCount,
        people,
        census,
        afis,
        atecedentsAOP,
        socialNetworks,
        peopleFiles,
        comparision,
        chronologyUAT,
        surveillanceOperationPeople,
        surveillanceOperationVehicles,
        surveillanceOperationAdressess,
        searchOperationTracking,
        searchOperationOthers,
        pliceReport,
        photographicSeries,
        mapUAT,
        arrestOperationLocation,
        arrestOperationDistrict,
        arrestOperationDate: arrestOperationDateFormatted.toString(),
        personsArrested,
        arrestsInFlagranteDelicto,
        arrestsForAdministrative,
        arrestsForTracking,
        arrestsByArrestWarrant,
        arrestsBySearchWarrant,
        personsLocatedUNNA,
        personsLocatedSocialWork,
        recoveredObjects,
        securedDrug,
        securedVehicles,
        securedObjects,
        informativeSheet,
        officesMP,
        deliveryDate: deliveryDateFormatted.toString(),
        deliveryHour,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(investigations.id, id));

    return { response: "success", message: "Investigación actualizada" };
  } catch (error) {
    return { response: "error", message: `Ha ocurrido un error: ${error}` };
  }
};
