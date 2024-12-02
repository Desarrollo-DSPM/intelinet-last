import { z } from "zod";

export const formSchemaCreateInvestigation = z.object({
  group: z.string().min(2, {
    message: "El grupo es requerido",
  }),
  supportUserId: z.coerce.number().int().positive().optional(),
  district: z.enum(["angel", "colon", "diana", "morelos", "villa", "zapata"], {
    message: "El distrito es requerido",
  }),
  investigationTypeId: z.coerce.number().int().positive().min(1, {
    message: "El tipo de investigación es requerido",
  }),
  investigationDate: z.date({
    required_error: "La fecha de la investigación es requerida",
  }),
  location: z.string().min(2, {
    message: "La ubicación es requerida",
  }),
  physicalVictim: z.string().optional(),
  moralVictim: z.string().optional(),
  callFolios: z.string().optional(),
  iphFolios: z.string().optional(),
  victimInv: z.coerce.number().int().default(0),
  witnessInv: z.coerce.number().int().default(0),
  invAccused: z.coerce.number().int().default(0),
  photoCount: z.coerce.number().int().default(0),
  videoCount: z.coerce.number().int().default(0),
});

export const formSchemaEditInvestigation = z.object({
  supportUserId: z.coerce.number().int().positive().optional(),
  district: z.enum(["angel", "colon", "diana", "morelos", "villa", "zapata"], {
    message: "El distrito es requerido",
  }),
  investigationTypeId: z.coerce.number().int().positive().min(1, {
    message: "El tipo de investigación es requerido",
  }),
  investigationDate: z.date({
    required_error: "La fecha de la investigación es requerida",
  }),
  location: z.string().min(2, {
    message: "La ubicación es requerida",
  }),
  physicalVictim: z.string().optional(),
  moralVictim: z.string().optional(),
  callFolios: z.string().optional(),
  iphFolios: z.string().optional(),
  victimInv: z.coerce.number().int().default(0),
  witnessInv: z.coerce.number().int().default(0),
  invAccused: z.coerce.number().int().default(0),
  photoCount: z.coerce.number().int().default(0),
  videoCount: z.coerce.number().int().default(0),
  people: z.string().optional(),
  census: z.coerce
    .number({
      required_error: "La cantidad de censos es requerida",
    })
    .int(),
  afis: z.coerce
    .number({
      required_error: "La cantidad de AFIS es requerida",
    })
    .int(),
  atecedentsAOP: z.coerce
    .number({
      required_error: "La cantidad de antecedentes AOP es requerida",
    })
    .int(),
  socialNetworks: z.string().optional(),
  peopleFiles: z.coerce
    .number({
      required_error: "La cantidad de archivos de personas es requerida",
    })
    .int(),
  comparision: z.coerce
    .number({
      required_error: "La cantidad de comparativa es requerida",
    })
    .int(),
  chronologyUAT: z.coerce
    .number({
      required_error: "La cantidad de cronología UAT es requerida",
    })
    .int(),
  surveillanceOperationPeople: z.coerce
    .number({
      required_error:
        "La cantidad de personas en operativo de vigilancia es requerida",
    })
    .int(),
  surveillanceOperationVehicles: z.coerce
    .number({
      required_error:
        "La cantidad de vehículos en operativo de vigilancia es requerida",
    })
    .int(),
  surveillanceOperationAdressess: z.coerce
    .number({
      required_error:
        "La cantidad de direcciones en operativo de vigilancia es requerida",
    })
    .int(),
  searchOperationTracking: z.coerce
    .number({
      required_error:
        "La cantidad de rastreo en operativo de búsqueda es requerida",
    })
    .int(),
  searchOperationOthers: z.coerce
    .number({
      required_error:
        "La cantidad de otros en operativo de búsqueda es requerida",
    })
    .int(),
  pliceReport: z.coerce
    .number({
      required_error: "La cantidad de reporte policial es requerida",
    })
    .int(),
  photographicSeries: z.coerce
    .number({
      required_error: "La cantidad de series fotográficas es requerida",
    })
    .int(),
  mapUAT: z.coerce
    .number({
      required_error: "La cantidad de mapas U.A.T. es requerida",
    })
    .int(),
  arrestOperationLocation: z.string().optional(),
  arrestOperationDistrict: z.string().optional(),
  arrestOperationDate: z.date().optional(),
  personsArrested: z.string().optional(),
  arrestsInFlagranteDelicto: z.coerce
    .number({
      required_error: "La cantidad de arrestos en flagrancia es requerida",
    })
    .int(),
  arrestsForAdministrative: z.coerce
    .number({
      required_error: "La cantidad de arrestos administrativos es requerida",
    })
    .int(),
  arrestsForTracking: z.coerce
    .number({
      required_error:
        "La cantidad de arrestos por seguimiento de la investigación es requerida",
    })
    .int(),
  arrestsByArrestWarrant: z.coerce
    .number({
      required_error:
        "La cantidad de arrestos por orden de aprehensión es requerida",
    })
    .int(),
  arrestsBySearchWarrant: z.coerce
    .number({
      required_error: "La cantidad de arrestos por orden de cateo es requerida",
    })
    .int(),
  personsLocatedUNNA: z.coerce
    .number({
      required_error:
        "La cantidad de personas localizadas y canalizadas a la UNNA es requerida",
    })
    .int(),
  personsLocatedSocialWork: z.coerce
    .number({
      required_error:
        "La cantidad de personas localizadas y canalizadas a trabajo social es requerida",
    })
    .int(),
  recoveredObjects: z.string().optional(),
  securedDrug: z.string().optional(),
  securedVehicles: z.string().optional(),
  securedObjects: z.string().optional(),
  informativeSheet: z.coerce
    .number({
      required_error: "La cantidad de fichas informativas es requerida",
    })
    .int(),
  officesMP: z.coerce
    .number({
      required_error: "La cantidad de oficios M.P. es requerida",
    })
    .int(),
  deliveryDate: z.date().optional(),
  deliveryHour: z.string().optional(),
});

export type People = {
  name: string;
  address: string;
  plate: string;
  phone: string;
};

export type SocialNetwork = {
  name: string;
  url: string;
};

export type PersonArrested = {
  name: string;
  pandilla: string;
  criminalGroup: string;
};

export type RecoveredObject = {
  typeRecovered: string;
  typeWeapon: string;
  quantity: number;
};

export type SecuredDrug = {
  type: string;
  unit: string;
  quantity: number;
};

export type Vehicle = {
  brand: string;
  model: string;
  type: string;
  color: string;
  plate: string;
  caracteristics: string;
};

export type Object = {
  type: string;
  description: string;
};
