"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";
import { es } from "date-fns/locale";

import { getAllInvestigationsTypes } from "@/actions/investigations/get-all-investigations-types";
import { editInvestigation } from "@/actions/investigations/edit-investigation";
import { getAllUsers } from "@/actions/users/get-users";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";
import {
  InvestigationType,
  InvestigationWithDetails,
  UserWithDepartment,
} from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import {
  formSchemaEditInvestigation,
  Object,
  People,
  PersonArrested,
  RecoveredObject,
  SecuredDrug,
  SocialNetwork,
  Vehicle,
} from "@/types/investigation";
import { ArrowDownToLine, CalendarIcon, Loader, Trash2, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { formatText } from "@/helpers/format-text";

interface EditInvestigationFormProps {
  investigation: InvestigationWithDetails;
}

export const EditInvestigationForm = ({
  investigation,
}: EditInvestigationFormProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<UserWithDepartment[]>([]);
  const [investigationTypes, setInvestigationTypes] = useState<
    InvestigationType[]
  >([]);
  const [callFolios, setCallFolios] = useState<string[]>(() => {
    const folios = investigation.investigation.callFolios;
    return folios ? JSON.parse(folios) : [];
  });
  const [callFolio, setCallFolio] = useState<string>("");
  const [iphFolios, setIphFolios] = useState<string[]>(() => {
    const folios = investigation.investigation.iphFolios;
    return folios ? JSON.parse(folios) : [];
  });
  const [iphFolio, setIphFolio] = useState<string>("");
  const [people, setPeople] = useState<People[]>(() => {
    const people = investigation.investigation.people;
    return people ? JSON.parse(people) : [];
  });

  const [peopleObject, setPeopleObject] = useState<People>({
    name: "",
    address: "",
    plate: "",
    phone: "",
  });
  const [socialNetworks, setSocialNetworks] = useState<SocialNetwork[]>(() => {
    const social = investigation.investigation.socialNetworks;
    return social ? JSON.parse(social) : [];
  });
  const [socialNetwork, setSocialNetwork] = useState<SocialNetwork>({
    name: "",
    url: "",
  });
  const [personsArrested, setPersonsArrested] = useState<PersonArrested[]>(
    () => {
      const personsArrested = investigation.investigation.personsArrested;
      return personsArrested ? JSON.parse(personsArrested) : [];
    }
  );
  const [personArrested, setPersonArrested] = useState<PersonArrested>({
    name: "",
    pandilla: "",
    criminalGroup: "",
  });
  const [recoveredObjects, setRecoveredObjects] = useState<RecoveredObject[]>(
    () => {
      const object = investigation.investigation.recoveredObjects;
      return object ? JSON.parse(object) : [];
    }
  );
  const [recoveredObject, setRecoveredObject] = useState<RecoveredObject>({
    typeRecovered: "",
    typeWeapon: "",
    quantity: 0,
  });
  const [securedDrugs, setSecuredDrugs] = useState<SecuredDrug[]>(() => {
    const drug = investigation.investigation.securedDrug;
    return drug ? JSON.parse(drug) : [];
  });
  const [securedDrug, setSecuredDrug] = useState<SecuredDrug>({
    type: "",
    unit: "",
    quantity: 0,
  });
  const [securedVehicles, setSecuredVehicles] = useState<Vehicle[]>(() => {
    const vehicle = investigation.investigation.securedVehicles;
    return vehicle ? JSON.parse(vehicle) : [];
  });
  const [securedVehicle, setSecuredVehicle] = useState<Vehicle>({
    brand: "",
    model: "",
    type: "",
    color: "",
    plate: "",
    caracteristics: "",
  });
  const [securedObjects, setSecuredObjects] = useState<Object[]>(() => {
    const object = investigation.investigation.securedObjects;
    return object ? JSON.parse(object) : [];
  });
  const [securedObject, setSecuredObject] = useState<Object>({
    type: "",
    description: "",
  });

  const router = useRouter();
  const { auth } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllUsers();
        setUsers(response.data);
        const investigationsTypesData = await getAllInvestigationsTypes();

        setInvestigationTypes(investigationsTypesData.data);
      } catch (error) {
        setUsers([]);
        console.log(error);
      }
    })();
  }, []);

  const addFolio = (type: string) => {
    if (type === "call") {
      setCallFolios([...callFolios, callFolio]);
      setCallFolio("");
    } else {
      setIphFolios([...iphFolios, iphFolio]);
      setIphFolio("");
    }
  };

  const removeFolio = (folio: string, type: string) => {
    if (type === "call") {
      setCallFolios(callFolios.filter((f) => f !== folio));
      setCallFolio("");
    } else {
      setIphFolios(iphFolios.filter((f) => f !== folio));
      setIphFolio("");
    }
  };

  const addPeople = (data: People) => {
    if (!data.name || !data.address || !data.plate || !data.phone) {
      toast.error("Todos los campos son requeridos");
      return;
    }

    setPeople([data, ...people]);
    setPeopleObject({
      name: "",
      address: "",
      plate: "",
      phone: "",
    });
  };

  const removePeople = (id: number) => {
    setPeople(people.filter((_, index) => index !== id));
  };

  const addSocialNetwork = (data: SocialNetwork) => {
    if (!data.name || !data.url) {
      toast.error("Todos los campos son requeridos");
      return;
    }

    setSocialNetworks([data, ...socialNetworks]);
    setSocialNetwork({
      name: "",
      url: "",
    });
  };

  const removeSocialNetwork = (id: number) => {
    setSocialNetworks(socialNetworks.filter((_, index) => index !== id));
  };

  const addPersonArrested = (data: PersonArrested) => {
    if (!data.name || !data.pandilla || !data.criminalGroup) {
      toast.error("El nombre, pandilla y grupo criminal son requeridos");
      return;
    }

    setPersonsArrested([data, ...personsArrested]);
    setPersonArrested({
      name: "",
      pandilla: "",
      criminalGroup: "",
    });
  };

  const removePersonArrested = (id: number) => {
    setPersonsArrested(personsArrested.filter((_, index) => index !== id));
  };

  const addRecoveredObject = (data: RecoveredObject) => {
    if (!data.typeRecovered || !data.typeWeapon || !data.quantity) {
      toast.error("Todos los campos son requeridos");
      return;
    }

    setRecoveredObjects([data, ...recoveredObjects]);
    setRecoveredObject({
      typeRecovered: "",
      typeWeapon: "",
      quantity: 0,
    });
  };

  const removeRecoveredObject = (id: number) => {
    setRecoveredObjects(recoveredObjects.filter((_, index) => index !== id));
  };

  const addSecuredDrug = (data: SecuredDrug) => {
    if (!data.type || !data.unit || !data.quantity) {
      toast.error("Todos los campos son requeridos");
      return;
    }

    setSecuredDrugs([data, ...securedDrugs]);
    setSecuredDrug({
      type: "",
      unit: "",
      quantity: 0,
    });
  };

  const removeSecuredDrug = (id: number) => {
    setSecuredDrugs(securedDrugs.filter((_, index) => index !== id));
  };

  const addSecuredVehicle = (data: Vehicle) => {
    if (
      !data.brand ||
      !data.model ||
      !data.color ||
      !data.plate ||
      !data.type
    ) {
      toast.error("Todos los campos son requeridos");
      return;
    }

    setSecuredVehicles([data, ...securedVehicles]);
    setSecuredVehicle({
      brand: "",
      model: "",
      type: "",
      color: "",
      plate: "",
      caracteristics: "",
    });
  };

  const removeSecuredVehicle = (id: number) => {
    setSecuredVehicles(securedVehicles.filter((_, index) => index !== id));
  };

  const addSecuredObject = (data: Object) => {
    if (!data.type || !data.description) {
      toast.error("El tipo y la descripción del objeto son requeridos");
      return;
    }

    setSecuredObjects([data, ...securedObjects]);
    setSecuredObject({
      type: "",
      description: "",
    });
  };

  const removeSecuredObject = (id: number) => {
    setSecuredObjects(securedObjects.filter((_, index) => index !== id));
  };

  const form = useForm<z.infer<typeof formSchemaEditInvestigation>>({
    resolver: zodResolver(formSchemaEditInvestigation),
    defaultValues: {
      supportUserId: undefined,
      district: investigation.investigation.district as
        | "angel"
        | "colon"
        | "diana"
        | "morelos"
        | "villa"
        | "zapata"
        | undefined,
      investigationTypeId: investigation.investigationType?.id,
      investigationDate: parse(
        investigation.investigation.investigationDate,
        "dd/MM/yyyy",
        new Date()
      ),
      location: investigation.investigation.location,
      physicalVictim: investigation.investigation.physicalVictim ?? "",
      moralVictim: investigation.investigation.moralVictim ?? "",
      victimInv: investigation.investigation.victimInv ?? 0,
      witnessInv: investigation.investigation.witnessInv ?? 0,
      invAccused: investigation.investigation.invAccused ?? 0,
      photoCount: investigation.investigation.photoCount ?? 0,
      videoCount: investigation.investigation.videoCount ?? 0,
      census: investigation.investigation.census ?? 0,
      afis: investigation.investigation.afis ?? 0,
      atecedentsAOP: investigation.investigation.atecedentsAOP ?? 0,
      peopleFiles: investigation.investigation.peopleFiles ?? 0,
      comparision: investigation.investigation.comparision ?? 0,
      chronologyUAT: investigation.investigation.chronologyUAT ?? 0,
      surveillanceOperationPeople:
        investigation.investigation.surveillanceOperationPeople ?? 0,
      surveillanceOperationVehicles:
        investigation.investigation.surveillanceOperationVehicles ?? 0,
      surveillanceOperationAdressess:
        investigation.investigation.surveillanceOperationAdressess ?? 0,
      searchOperationTracking:
        investigation.investigation.searchOperationTracking ?? 0,
      searchOperationOthers:
        investigation.investigation.searchOperationOthers ?? 0,
      pliceReport: investigation.investigation.pliceReport ?? 0,
      photographicSeries: investigation.investigation.photographicSeries ?? 0,
      mapUAT: investigation.investigation.mapUAT ?? 0,
      arrestOperationLocation:
        investigation.investigation.arrestOperationLocation ?? "",
      arrestOperationDistrict:
        investigation.investigation.arrestOperationDistrict ?? "",
      arrestOperationDate: investigation.investigation.arrestOperationDate
        ? parse(
            investigation.investigation.arrestOperationDate,
            "dd/MM/yyyy",
            new Date()
          )
        : undefined,
      arrestsInFlagranteDelicto:
        investigation.investigation.arrestsInFlagranteDelicto ?? 0,
      arrestsForAdministrative:
        investigation.investigation.arrestsForAdministrative ?? 0,
      arrestsForTracking: investigation.investigation.arrestsForTracking ?? 0,
      arrestsByArrestWarrant:
        investigation.investigation.arrestsByArrestWarrant ?? 0,
      arrestsBySearchWarrant:
        investigation.investigation.arrestsBySearchWarrant ?? 0,
      personsLocatedUNNA: investigation.investigation.personsLocatedUNNA ?? 0,
      personsLocatedSocialWork:
        investigation.investigation.personsLocatedSocialWork ?? 0,
      informativeSheet: investigation.investigation.informativeSheet ?? 0,
      officesMP: investigation.investigation.officesMP ?? 0,
      deliveryDate: investigation.investigation.deliveryDate
        ? parse(
            investigation.investigation.deliveryDate,
            "dd/MM/yyyy",
            new Date()
          )
        : undefined,
      deliveryHour: investigation.investigation.deliveryHour ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchemaEditInvestigation>) {
    const valuesForm = {
      ...values,
      callFolios: JSON.stringify(callFolios),
      iphFolios: JSON.stringify(iphFolios),
      people: JSON.stringify(people),
      socialNetworks: JSON.stringify(socialNetworks),
      arresOperationDate: values.arrestOperationDate
        ? values.arrestOperationDate
        : "",
      personsArrested: JSON.stringify(personsArrested),
      recoveredObjects: JSON.stringify(recoveredObjects),
      securedDrug: JSON.stringify(securedDrugs),
      securedVehicles: JSON.stringify(securedVehicles),
      securedObjects: JSON.stringify(securedObjects),
    };

    if (!auth?.id) {
      toast.error("User ID is undefined");
      setIsLoading(false);
      return;
    }

    const res = await editInvestigation({
      id: investigation.investigation.id,
      values: valuesForm,
    });

    if (res?.response === "success") {
      router.refresh();
      toast.success(res.message);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      toast.error(res.message);
    }
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 lg:pb-20"
      >
        <FormField
          control={form.control}
          name="supportUserId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del Elemento que Brindó Apoyo</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                value={field.value ? String(field.value) : undefined}
                defaultValue={field.value ? String(field.value) : undefined}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el Elemento que brindó Apoyo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={String(user.id)}>
                      {user.name + " " + user.lastname}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Distrito</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(value)}
                value={field.value ? String(field.value) : undefined}
                defaultValue={field.value ? String(field.value) : undefined}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el Distrito" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="angel">Ángel</SelectItem>
                  <SelectItem value="colon">Colón</SelectItem>
                  <SelectItem value="diana">Diana</SelectItem>
                  <SelectItem value="morelos">Morelos</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="zapata">Zapata</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="investigationTypeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de investigación</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                value={field.value ? String(field.value) : undefined}
                defaultValue={field.value ? String(field.value) : undefined}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo de investigación" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0">
                    Selecciona el tipo de investigación
                  </SelectItem>
                  {investigationTypes.map((investigationType) => (
                    <SelectItem
                      key={investigationType.id}
                      value={String(investigationType.id)}
                    >
                      {investigationType.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="investigationDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {format(
                        field.value instanceof Date
                          ? field.value
                          : parse(field.value, "dd/MM/yyyy", new Date()),
                        "dd MMM, yyyy",
                        { locale: es }
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    locale={es}
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ubicación</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ubicación"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="physicalVictim"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Víctima Física</FormLabel>
              <FormControl>
                <Input
                  placeholder="Víctima Física"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="moralVictim"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Víctima Moral</FormLabel>
              <FormControl>
                <Input
                  placeholder="Víctima Moral"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-end gap-5">
          <div className="flex-1 space-y-2">
            <Label htmlFor="callFolio">Llamada 9.1.1.</Label>
            <Input
              type="text"
              id="callFolio"
              value={callFolio}
              onChange={(e) => setCallFolio(e.target.value)}
            />
          </div>
          <Button type="button" onClick={() => addFolio("call")}>
            Agregar Folio Llamada
          </Button>
        </div>
        <div>
          <ul className="flex items-center gap-4 flex-wrap">
            {callFolios.length > 0 &&
              callFolios.map((folio) => {
                return (
                  <li key={folio}>
                    <Badge
                      className="text-base gap-3 py-2 rounded-full font-normal"
                      variant="outline"
                    >
                      {folio}
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              size="icon"
                              className="rounded-full size-6"
                              variant="danger"
                              onClick={() => removeFolio(folio, "call")}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Eliminar</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Badge>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="flex items-end gap-5">
          <div className="flex-1 space-y-2">
            <Label htmlFor="iphFolio">IPH</Label>
            <Input
              type="text"
              id="iphFolio"
              value={iphFolio}
              onChange={(e) => setIphFolio(e.target.value)}
            />
          </div>
          <Button type="button" onClick={() => addFolio("iph")}>
            Agregar Folio IPH
          </Button>
        </div>
        <div>
          <ul className="flex items-center gap-4 flex-wrap">
            {iphFolios.length > 0 &&
              iphFolios.map((folio) => {
                return (
                  <li key={folio}>
                    <Badge
                      className="text-base gap-3 py-2 rounded-full font-normal"
                      variant="outline"
                    >
                      {folio}
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              size="icon"
                              className="rounded-full size-6"
                              variant="danger"
                              onClick={() => removeFolio(folio, "iph")}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Eliminar</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Badge>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <FormField
            control={form.control}
            name="victimInv"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Investigación víctimas</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Investigación a víctimas (cantidad)"
                    type="number"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="witnessInv"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Investigación testigos</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Investigación a testigos (cantidad)"
                    type="number"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="invAccused"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Investigación imputados</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Investigación a imputados (cantidad)"
                    type="number"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="photoCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Serie fotográfica del lugar de los hechos</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Cantidad de fotos"
                    type="number"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="videoCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vídeo grabaciones</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Cantidad de videos"
                    type="number"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="bg-gradient-to-r from-primary from-10% to-transparent to-90% px-4 py-2 rounded-s-full">
          <h2 className="font-bold text-primary-foreground">Consultas</h2>
        </div>
        <div className="flex items-end gap-5">
          <div className="flex-1 space-y-2">
            <Label htmlFor="peopleName">Nombre</Label>
            <Input
              type="text"
              id="peopleName"
              value={peopleObject.name}
              onChange={(e) =>
                setPeopleObject({ ...peopleObject, name: e.target.value })
              }
            />
          </div>
          <div className="flex-1 space-y-2">
            <Label htmlFor="peopleAddress">Dirección</Label>
            <Input
              type="text"
              id="peopleAddress"
              value={peopleObject.address}
              onChange={(e) =>
                setPeopleObject({ ...peopleObject, address: e.target.value })
              }
            />
          </div>
          <div className="flex-1 space-y-2">
            <Label htmlFor="peoplePlate">Matrícula</Label>
            <Input
              type="text"
              id="peoplePlate"
              value={peopleObject.plate}
              onChange={(e) =>
                setPeopleObject({ ...peopleObject, plate: e.target.value })
              }
            />
          </div>
          <div className="flex-1 space-y-2">
            <Label htmlFor="peoplePhone">Teléfono</Label>
            <Input
              type="text"
              id="peoplePhone"
              value={peopleObject.phone}
              onChange={(e) =>
                setPeopleObject({ ...peopleObject, phone: e.target.value })
              }
            />
          </div>
          <Button type="button" onClick={() => addPeople(peopleObject)}>
            Agregar
          </Button>
        </div>
        <div>
          {people.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {people.map((people, index) => (
                <li key={index}>
                  <Card>
                    <CardHeader>
                      <ul className="space-y-2">
                        <li>
                          <span className="text-muted-foreground">Nombre:</span>{" "}
                          <span className="font-medium">{people.name}</span>
                        </li>
                        <li>
                          <span className="text-muted-foreground">
                            Dirección:
                          </span>{" "}
                          <span className="font-medium">{people.address}</span>
                        </li>
                        <li>
                          <span className="text-muted-foreground">
                            Matrícula:
                          </span>{" "}
                          <span className="font-medium">{people.plate}</span>
                        </li>
                        <li>
                          <span className="text-muted-foreground">
                            Teléfono:
                          </span>{" "}
                          <span className="font-medium">{people.phone}</span>
                        </li>
                      </ul>
                    </CardHeader>
                    <Separator />
                    <CardFooter className="pt-6">
                      <Button
                        type="button"
                        className="w-full"
                        variant="danger"
                        onClick={() => removePeople(index)}
                      >
                        Eliminar
                      </Button>
                    </CardFooter>
                  </Card>
                </li>
              ))}
            </ul>
          ) : (
            <div className="my-10 text-center">
              <p className="text-muted-foreground text-center inline-flex items-center">
                Aquí aparecerán las personas agregadas a la investigación{" "}
                <ArrowDownToLine className="ml-2 w-4 h-4" />
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center gap-5">
          <div className="w-full">
            <FormField
              control={form.control}
              name="census"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Censos</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Cantidad de censos"
                      type="number"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full">
            <FormField
              control={form.control}
              name="afis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Afis</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Cantidad de afis"
                      type="number"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full">
            <FormField
              control={form.control}
              name="atecedentsAOP"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Antecedentes AOP</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Antecedentes AOP"
                      type="number"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold">Redes sociales</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-end">
          <div className="space-y-2">
            <Label htmlFor="socialNetworkName">Red social</Label>
            <Select
              value={socialNetwork.name}
              onValueChange={(value) =>
                setSocialNetwork({ ...socialNetwork, name: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona la red social" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="linkedin">Linkedin</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="xl:col-span-2 space-y-2">
            <Label htmlFor="socialNetworkUrl">URL</Label>
            <Input
              type="text"
              id="socialNetworkUrl"
              placeholder="https://www.facebook.com/username"
              value={socialNetwork.url}
              onChange={(e) =>
                setSocialNetwork({ ...socialNetwork, url: e.target.value })
              }
            />
          </div>
          <Button type="button" onClick={() => addSocialNetwork(socialNetwork)}>
            Agregar
          </Button>
        </div>
        <div>
          {socialNetworks.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {socialNetworks.map((social, index) => (
                <li key={index}>
                  <Card>
                    <CardHeader className="flex-row items-center gap-3">
                      <Image
                        src={`/icons/social/${social.name}.png`}
                        alt={social.name}
                        width={50}
                        height={50}
                        className="w-10 h-10 object-cover mt-1"
                      />
                      <div>
                        <h4 className="capitalize text-lg font-medium">
                          {social.name}
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          {social.url}
                        </p>
                      </div>
                    </CardHeader>
                    <CardFooter>
                      <Button
                        type="button"
                        className="w-full"
                        variant="danger"
                        onClick={() => removeSocialNetwork(index)}
                      >
                        Eliminar
                      </Button>
                    </CardFooter>
                  </Card>
                </li>
              ))}
            </ul>
          ) : (
            <div className="my-10 text-center">
              <p className="text-muted-foreground text-center inline-flex items-center">
                Aquí aparecerán las redes sociales
                <ArrowDownToLine className="ml-2 w-4 h-4" />
              </p>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <FormField
            control={form.control}
            name="peopleFiles"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fichas de personas</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Fichas de personas (cantidad)"
                    type="number"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="comparision"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comparativa</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Comparativa (cantidad)"
                    type="number"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="chronologyUAT"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cronología U.A.T.</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Cronología U.A.T. (cantidad)"
                    type="number"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <h3 className="text-xl font-bold">Operativo de vigilancia</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <FormField
            control={form.control}
            name="surveillanceOperationPeople"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cantidad de personas</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Cantidad de personas"
                    type="number"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="surveillanceOperationVehicles"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cantidad de vehículos</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Cantidad de vehículos"
                    type="number"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="surveillanceOperationAdressess"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cantidad de direcciones</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Cantidad de direcciones"
                    type="number"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <h3 className="text-xl font-bold">Operativo de busqueda</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="searchOperationTracking"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rastreos (cantidad)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Cantidad (cantidad)"
                    type="number"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="searchOperationOthers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Otros (cantidad)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Otros (cantidad)"
                    type="number"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <FormField
            control={form.control}
            name="pliceReport"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reporte policial (cantidad)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Reporte policial (cantidad)"
                    type="number"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="photographicSeries"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Serie fotográfica (cantidad)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Serie fotográfica (cantidad)"
                    type="number"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mapUAT"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mapa de U.A.T. (cantidad)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Mapa de U.A.T. (cantidad)"
                    type="number"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="bg-gradient-to-r from-primary from-10% to-transparent to-90% px-4 py-2 rounded-s-full">
          <h2 className="font-bold text-primary-foreground">
            Operativo de detención
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-end">
          <FormField
            control={form.control}
            name="arrestOperationLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ubicación</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ubicación de la detención"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="arrestOperationDistrict"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Distrito</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value ? String(field.value) : undefined}
                  defaultValue={field.value ? String(field.value) : undefined}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el Distrito" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="angel">Ángel</SelectItem>
                    <SelectItem value="colon">Colón</SelectItem>
                    <SelectItem value="diana">Diana</SelectItem>
                    <SelectItem value="morelos">Morelos</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="zapata">Zapata</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="arrestOperationDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? format(
                              field.value instanceof Date
                                ? field.value
                                : parse(field.value, "dd/MM/yyyy", new Date()),
                              "dd MMM, yyyy",
                              { locale: es }
                            )
                          : ""}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      locale={es}
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <h3 className="text-xl font-bold">Personas detenidas</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-end gap-5">
          <div className="flex-1 space-y-2">
            <Label htmlFor="personArrestedName">Nombre</Label>
            <Input
              type="text"
              id="personArrestedName"
              placeholder="Pancho Barraza"
              value={personArrested.name}
              onChange={(e) =>
                setPersonArrested({ ...personArrested, name: e.target.value })
              }
            />
          </div>
          <div className="flex-1 space-y-2">
            <Label htmlFor="personArrestedPandilla">Pandilla</Label>
            <Input
              type="text"
              id="personArrestedPandilla"
              placeholder="Los Zetas"
              value={personArrested.pandilla}
              onChange={(e) =>
                setPersonArrested({
                  ...personArrested,
                  pandilla: e.target.value,
                })
              }
            />
          </div>
          <div className="flex-1 space-y-2">
            <Label htmlFor="personArrestedCriminalGroup">Grupo delictivo</Label>
            <Input
              type="text"
              id="personArrestedCriminalGroup"
              placeholder="Cártel del golfo"
              value={personArrested.criminalGroup}
              onChange={(e) =>
                setPersonArrested({
                  ...personArrested,
                  criminalGroup: e.target.value,
                })
              }
            />
          </div>
          <Button
            type="button"
            onClick={() => addPersonArrested(personArrested)}
          >
            Agregar
          </Button>
        </div>
        <div>
          {personsArrested.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {personsArrested.map((person, index) => (
                <li key={index}>
                  <Card>
                    <CardHeader>
                      <ul className="space-y-2">
                        <li>
                          <span className="text-muted-foreground">Nombre:</span>{" "}
                          <span className="font-medium">{person.name}</span>
                        </li>
                        <li>
                          <span className="text-muted-foreground">
                            Pandilla:
                          </span>{" "}
                          <span className="font-medium">{person.pandilla}</span>
                        </li>
                        <li>
                          <span className="text-muted-foreground">
                            Grupo criminal:
                          </span>{" "}
                          <span className="font-medium">
                            {person.criminalGroup}
                          </span>
                        </li>
                      </ul>
                    </CardHeader>
                    <Separator />
                    <CardFooter className="pt-6">
                      <Button
                        type="button"
                        className="w-full"
                        variant="danger"
                        onClick={() => removePersonArrested(index)}
                      >
                        Eliminar
                      </Button>
                    </CardFooter>
                  </Card>
                </li>
              ))}
            </ul>
          ) : (
            <div className="my-10 text-center">
              <p className="text-muted-foreground text-center inline-flex items-center">
                Aquí aparecerán las personas arrestadas{" "}
                <ArrowDownToLine className="ml-2 w-4 h-4" />
              </p>
            </div>
          )}
        </div>
        <div>
          <h3 className="text-xl font-bold">
            Detenciones y arrestos por D.S.P.M. (Cantidad)
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 items-end gap-5">
          <FormField
            control={form.control}
            name="arrestsInFlagranteDelicto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Por flagrancia</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Por flagrancia"
                    type="number"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="arrestsForAdministrative"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Por administrativo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Por administrativo"
                    type="number"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="arrestsForTracking"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Por seguimiento de la investigación</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Por seguimiento de la investigación"
                    type="number"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="arrestsByArrestWarrant"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Por orden de aprehensión</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Por orden de aprehensión"
                    type="number"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="arrestsBySearchWarrant"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Por orden de cateo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Por orden de cateo"
                    type="number"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <h3 className="text-xl font-bold">Personas localizadas</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="personsLocatedUNNA"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Canalizaciones a UNNA</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Canalizaciones a UNNA"
                    type="number"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="personsLocatedSocialWork"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Canalizaciones a trabajo social</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Canalizaciones a trabajo social"
                    type="number"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <h3 className="text-xl font-bold">Objetos recuperados</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-end">
          <div className="space-y-2">
            <Label htmlFor="recoveredObjectType">Tipo de recuperación</Label>
            <Select
              value={recoveredObject.typeRecovered}
              onValueChange={(value) =>
                setRecoveredObject({ ...recoveredObject, typeRecovered: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Tipo de recuperación" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flagrante">Flagrancia</SelectItem>
                <SelectItem value="tracking">
                  Seguimiento de investigación
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="recoveredObjectTypeWeapon">Tipo de arma</Label>
            <Select
              value={recoveredObject.typeWeapon}
              onValueChange={(value) =>
                setRecoveredObject({ ...recoveredObject, typeWeapon: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Tipo de arma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="arma-corta">Arma corta</SelectItem>
                <SelectItem value="arma-hechiza">Arma hechiza</SelectItem>
                <SelectItem value="arma-larga">Arma larga</SelectItem>
                <SelectItem value="arma-utileria">Arma de utilería</SelectItem>
                <SelectItem value="cuchillo">Cuchillo</SelectItem>
                <SelectItem value="navaja">Navaja</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="recoveredObjectQuantity">Cantidad</Label>
            <Input
              id="recoveredObjectQuantity"
              placeholder="2"
              type="number"
              value={recoveredObject.quantity}
              onChange={(e) =>
                setRecoveredObject({
                  ...recoveredObject,
                  quantity: Number(e.target.value),
                })
              }
            />
          </div>
          <Button
            type="button"
            onClick={() => addRecoveredObject(recoveredObject)}
          >
            Agregar
          </Button>
        </div>
        <div>
          {recoveredObjects.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {recoveredObjects.map((object, index) => (
                <li key={index}>
                  <Card>
                    <CardHeader>
                      <div className="inline-flex items-start justify-between">
                        <div className="bg-secondary flex items-center justify-center w-20 h-20 rounded-2xl">
                          <Image
                            src={
                              object.typeRecovered === "arma-corta"
                                ? "/icons/weapons/short-weapon.png"
                                : object.typeWeapon === "arma-hechiza"
                                ? "/icons/weapons/custom-weapon.png"
                                : object.typeWeapon === "arma-larga"
                                ? "/icons/weapons/long-weapon.png"
                                : object.typeWeapon === "arma-utileria"
                                ? "/icons/weapons/short-weapon.png"
                                : object.typeWeapon === "cuchillo"
                                ? "/icons/weapons/knife.png"
                                : "/icons/weapons/navaja.png"
                            }
                            alt="Weapon"
                            width={500}
                            height={500}
                            className="w-14 h-14 object-cover"
                          />
                        </div>
                        <div>
                          <Button
                            type="button"
                            size="icon"
                            variant="outline"
                            onClick={() => removeRecoveredObject(index)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4 bg-secondary p-3 rounded-xl">
                        <li className="flex flex-col gap-1">
                          <span className="text-muted-foreground text-sm">
                            Tipo de recuperación
                          </span>{" "}
                          <span className="font-medium">
                            {object.typeRecovered === "flagrante"
                              ? "En flagrancia"
                              : "Seguimiento de investigación"}
                          </span>
                        </li>
                        <li className="flex flex-col gap-1">
                          <span className="text-muted-foreground text-sm">
                            Tipo de arma
                          </span>{" "}
                          <span className="font-medium">
                            {object.typeRecovered === "arma-corta"
                              ? "Arma corta"
                              : object.typeWeapon === "arma-hechiza"
                              ? "Arma hechiza"
                              : object.typeWeapon === "arma-larga"
                              ? "Arma larga"
                              : object.typeWeapon === "arma-utileria"
                              ? "Arma de utilería"
                              : object.typeWeapon === "cuchillo"
                              ? "Cuchillo"
                              : "Navaja"}
                          </span>
                        </li>
                        <li className="flex flex-col gap-1">
                          <span className="text-muted-foreground text-sm">
                            Cantidad recuperada
                          </span>{" "}
                          <span className="font-medium">
                            {object.quantity} unidades
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          ) : (
            <div className="my-10 text-center">
              <p className="text-muted-foreground text-center inline-flex items-center">
                Aquí aparecerán los objetos recuperados{" "}
                <ArrowDownToLine className="ml-2 w-4 h-4" />
              </p>
            </div>
          )}
        </div>
        <div>
          <h3 className="text-xl font-bold">Droga asegurada</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-end">
          <div className="space-y-2">
            <Label htmlFor="securedDrugType">Tipo de droga</Label>
            <Select
              value={securedDrug.type}
              onValueChange={(value) =>
                setSecuredDrug({ ...securedDrug, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Tipo de droga" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cocaina">Cocaína</SelectItem>
                <SelectItem value="cristal">Cristal</SelectItem>
                <SelectItem value="marihuana">Marihuana</SelectItem>
                <SelectItem value="pastillas">Pastillas</SelectItem>
                <SelectItem value="heroina">Heroína</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="securedDrugUnit">Unidad de medida</Label>
            <Select
              value={securedDrug.unit}
              onValueChange={(value) =>
                setSecuredDrug({ ...securedDrug, unit: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Unidad de medida" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grs">Gramos</SelectItem>
                <SelectItem value="kgs">Kilogramos</SelectItem>
                <SelectItem value="tns">Toneladas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="securedDrugQuantity">Cantidad</Label>
            <Input
              id="securedDrugQuantity"
              placeholder="2"
              type="number"
              value={securedDrug.quantity}
              onChange={(e) =>
                setSecuredDrug({
                  ...securedDrug,
                  quantity: Number(e.target.value),
                })
              }
            />
          </div>
          <Button type="button" onClick={() => addSecuredDrug(securedDrug)}>
            Agregar
          </Button>
        </div>
        <div>
          {securedDrugs.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Droga</TableHead>
                  <TableHead>Cantidad</TableHead>
                  <TableHead>Unidad de medida</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {securedDrugs.map((drug, index) => {
                  let drugType = drug.type;
                  let drugUnit = drug.unit;

                  switch (drug.type) {
                    case "cocaina":
                      drugType = "Cocaína";
                      break;
                    case "cristal":
                      drugType = "Cristal";
                      break;
                    case "marihuana":
                      drugType = "Marihuana";
                      break;
                    case "pastillas":
                      drugType = "Pastillas";
                      break;
                    case "heroina":
                      drugType = "Heroína";
                      break;

                    default:
                      drugType = "Marihuana";
                      break;
                  }

                  switch (drug.type) {
                    case "grs":
                      drugUnit = "Gramos";
                      break;
                    case "kgs":
                      drugUnit = "Kilogramos";
                      break;
                    case "tns":
                      drugUnit = "Toneladas";
                      break;

                    default:
                      drugUnit = "Kilogramos";
                      break;
                  }

                  return (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{drugType}</TableCell>
                      <TableCell>{drug.quantity.toFixed(2)}</TableCell>
                      <TableCell>{drugUnit}</TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() => removeSecuredDrug(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="my-10 text-center">
              <p className="text-muted-foreground text-center inline-flex items-center">
                Aquí aparecerán las dorgas aseguradas{" "}
                <ArrowDownToLine className="ml-2 w-4 h-4" />
              </p>
            </div>
          )}
        </div>
        <div>
          <h3 className="text-xl font-bold">Vehículos asegurados</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-end">
          <div className="space-y-2">
            <Label>Marca</Label>
            <Select
              value={securedVehicle.brand}
              onValueChange={(value) =>
                setSecuredVehicle({ ...securedVehicle, brand: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Marca" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="audi">Audi</SelectItem>
                <SelectItem value="bmw">BMW</SelectItem>
                <SelectItem value="chevrolet">Chevrolet</SelectItem>
                <SelectItem value="dodge">Dodge</SelectItem>
                <SelectItem value="fiat">Fiat</SelectItem>
                <SelectItem value="ford">Ford</SelectItem>
                <SelectItem value="honda">Honda</SelectItem>
                <SelectItem value="hyundai">Hyundai</SelectItem>
                <SelectItem value="jeep">Jeep</SelectItem>
                <SelectItem value="kia">Kia</SelectItem>
                <SelectItem value="mazda">Mazda</SelectItem>
                <SelectItem value="mercedes-benz">Mercedes-Benz</SelectItem>
                <SelectItem value="mitsubishi">Mitsubishi</SelectItem>
                <SelectItem value="nissan">Nissan</SelectItem>
                <SelectItem value="peugeot">Peugeot</SelectItem>
                <SelectItem value="renault">Renault</SelectItem>
                <SelectItem value="seat">SEAT</SelectItem>
                <SelectItem value="subaru">Subaru</SelectItem>
                <SelectItem value="suzuki">Suzuki</SelectItem>
                <SelectItem value="toyota">Toyota</SelectItem>
                <SelectItem value="volkswagen">Volkswagen</SelectItem>
                <SelectItem value="volvo">Volvo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Tipo</Label>
            <Select
              value={securedVehicle.type}
              onValueChange={(value) =>
                setSecuredVehicle({ ...securedVehicle, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Audi</SelectLabel>
                  <SelectItem value="audi-a3">A3</SelectItem>
                  <SelectItem value="audi-a4">A4</SelectItem>
                  <SelectItem value="audi-q5">Q5</SelectItem>
                  <SelectItem value="audi-q7">Q7</SelectItem>
                  <SelectItem value="audi-tt">TT</SelectItem>
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel>BMW</SelectLabel>
                  <SelectItem value="bmw-3-series">Serie 3</SelectItem>
                  <SelectItem value="bmw-5-series">Serie 5</SelectItem>
                  <SelectItem value="bmw-x1">X1</SelectItem>
                  <SelectItem value="bmw-x5">X5</SelectItem>
                  <SelectItem value="bmw-z4">Z4</SelectItem>
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel>Chevrolet</SelectLabel>
                  <SelectItem value="chevrolet-camaro">Camaro</SelectItem>
                  <SelectItem value="chevrolet-malibu">Malibu</SelectItem>
                  <SelectItem value="chevrolet-silverado">Silverado</SelectItem>
                  <SelectItem value="chevrolet-suburban">Suburban</SelectItem>
                  <SelectItem value="chevrolet-tahoe">Tahoe</SelectItem>
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel>Dodge</SelectLabel>
                  <SelectItem value="dodge-challenger">Challenger</SelectItem>
                  <SelectItem value="dodge-charger">Charger</SelectItem>
                  <SelectItem value="dodge-durango">Durango</SelectItem>
                  <SelectItem value="dodge-journey">Journey</SelectItem>
                  <SelectItem value="dodge-ram">RAM</SelectItem>
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel>Ford</SelectLabel>
                  <SelectItem value="ford-escape">Escape</SelectItem>
                  <SelectItem value="ford-explorer">Explorer</SelectItem>
                  <SelectItem value="ford-f150">F-150</SelectItem>
                  <SelectItem value="ford-focus">Focus</SelectItem>
                  <SelectItem value="ford-mustang">Mustang</SelectItem>
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel>Honda</SelectLabel>
                  <SelectItem value="honda-accord">Accord</SelectItem>
                  <SelectItem value="honda-civic">Civic</SelectItem>
                  <SelectItem value="honda-crv">CR-V</SelectItem>
                  <SelectItem value="honda-hrv">HR-V</SelectItem>
                  <SelectItem value="honda-pilot">Pilot</SelectItem>
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel>Nissan</SelectLabel>
                  <SelectItem value="nissan-altima">Altima</SelectItem>
                  <SelectItem value="nissan-frontier">Frontier</SelectItem>
                  <SelectItem value="nissan-maxima">Maxima</SelectItem>
                  <SelectItem value="nissan-rogue">Rogue</SelectItem>
                  <SelectItem value="nissan-titan">Titan</SelectItem>
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel>Toyota</SelectLabel>
                  <SelectItem value="toyota-4runner">4Runner</SelectItem>
                  <SelectItem value="toyota-camry">Camry</SelectItem>
                  <SelectItem value="toyota-corolla">Corolla</SelectItem>
                  <SelectItem value="toyota-prius">Prius</SelectItem>
                  <SelectItem value="toyota-tundra">Tundra</SelectItem>
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel>Volkswagen</SelectLabel>
                  <SelectItem value="volkswagen-jetta">Jetta</SelectItem>
                  <SelectItem value="volkswagen-passat">Passat</SelectItem>
                  <SelectItem value="volkswagen-taos">Taos</SelectItem>
                  <SelectItem value="volkswagen-tiguan">Tiguan</SelectItem>
                  <SelectItem value="volkswagen-virtus">Virtus</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Modelo</Label>
            <Select
              value={securedVehicle.model}
              onValueChange={(value) =>
                setSecuredVehicle({ ...securedVehicle, model: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Modelo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
                <SelectItem value="2020">2020</SelectItem>
                <SelectItem value="2019">2019</SelectItem>
                <SelectItem value="2018">2018</SelectItem>
                <SelectItem value="2017">2017</SelectItem>
                <SelectItem value="2016">2016</SelectItem>
                <SelectItem value="2015">2015</SelectItem>
                <SelectItem value="2014">2014</SelectItem>
                <SelectItem value="2013">2013</SelectItem>
                <SelectItem value="2012">2012</SelectItem>
                <SelectItem value="2011">2011</SelectItem>
                <SelectItem value="2010">2010</SelectItem>
                <SelectItem value="2009">2009</SelectItem>
                <SelectItem value="2008">2008</SelectItem>
                <SelectItem value="2007">2007</SelectItem>
                <SelectItem value="2006">2006</SelectItem>
                <SelectItem value="2005">2005</SelectItem>
                <SelectItem value="2004">2004</SelectItem>
                <SelectItem value="2003">2003</SelectItem>
                <SelectItem value="2002">2002</SelectItem>
                <SelectItem value="2001">2001</SelectItem>
                <SelectItem value="2000">2000</SelectItem>
                <SelectItem value="1999">1999</SelectItem>
                <SelectItem value="1998">1998</SelectItem>
                <SelectItem value="1997">1997</SelectItem>
                <SelectItem value="1996">1996</SelectItem>
                <SelectItem value="1995">1995</SelectItem>
                <SelectItem value="1994">1994</SelectItem>
                <SelectItem value="1993">1993</SelectItem>
                <SelectItem value="1992">1992</SelectItem>
                <SelectItem value="1991">1991</SelectItem>
                <SelectItem value="1990">1990</SelectItem>
                <SelectItem value="1989">1989</SelectItem>
                <SelectItem value="1988">1988</SelectItem>
                <SelectItem value="1987">1987</SelectItem>
                <SelectItem value="1986">1986</SelectItem>
                <SelectItem value="1985">1985</SelectItem>
                <SelectItem value="1984">1984</SelectItem>
                <SelectItem value="1983">1983</SelectItem>
                <SelectItem value="1982">1982</SelectItem>
                <SelectItem value="1981">1981</SelectItem>
                <SelectItem value="1980">1980</SelectItem>
                <SelectItem value="1979">1979</SelectItem>
                <SelectItem value="1978">1978</SelectItem>
                <SelectItem value="1977">1977</SelectItem>
                <SelectItem value="1976">1976</SelectItem>
                <SelectItem value="1975">1975</SelectItem>
                <SelectItem value="1974">1974</SelectItem>
                <SelectItem value="1973">1973</SelectItem>
                <SelectItem value="1972">1972</SelectItem>
                <SelectItem value="1971">1971</SelectItem>
                <SelectItem value="1970">1970</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Color</Label>
            <Select
              value={securedVehicle.color}
              onValueChange={(value) =>
                setSecuredVehicle({ ...securedVehicle, color: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Color" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Colores básicos</SelectLabel>
                  <SelectItem value="negro">Negro</SelectItem>
                  <SelectItem value="blanco">Blanco</SelectItem>
                  <SelectItem value="gris">Gris</SelectItem>
                  <SelectItem value="rojo">Rojo</SelectItem>
                  <SelectItem value="azul">Azul</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Colores metálicos</SelectLabel>
                  <SelectItem value="plata">Plata</SelectItem>
                  <SelectItem value="oro">Oro</SelectItem>
                  <SelectItem value="bronce">Bronce</SelectItem>
                  <SelectItem value="cobre">Cobre</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Matrícula</Label>
            <Input
              placeholder="ABC-123"
              value={securedVehicle.plate}
              onChange={(e) =>
                setSecuredVehicle({
                  ...securedVehicle,
                  plate: e.target.value.toUpperCase(),
                })
              }
            />
          </div>
          <div className="space-y-2 xl:col-span-3">
            <Label>Características</Label>
            <Textarea
              placeholder="Escribe características del vehículo"
              className="resize-none"
              value={securedVehicle.caracteristics}
              rows={3}
              onChange={(e) =>
                setSecuredVehicle({
                  ...securedVehicle,
                  caracteristics: e.target.value,
                })
              }
            />
          </div>
          <div>
            <Button
              type="button"
              className="w-full"
              onClick={() => addSecuredVehicle(securedVehicle)}
            >
              Agregar
            </Button>
          </div>
        </div>
        <div>
          {securedVehicles.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {securedVehicles.map((vehicle, index) => {
                return (
                  <li key={index}>
                    <Card>
                      <CardHeader>
                        <div className="inline-flex items-start justify-between">
                          <div className="bg-secondary flex items-center justify-center w-20 h-20 rounded-2xl">
                            <Image
                              src="/icons/vehicles/secured-vehicle.png"
                              alt="Vehicle"
                              width={500}
                              height={500}
                              className="w-14 h-14 object-cover"
                            />
                          </div>
                          <div>
                            <Button
                              type="button"
                              size="icon"
                              variant="outline"
                              onClick={() => removeSecuredVehicle(index)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 bg-secondary p-3 rounded-xl">
                          <li className="flex flex-col gap-1">
                            <span className="text-muted-foreground text-sm">
                              Marca
                            </span>{" "}
                            <span className="font-medium uppercase">
                              {vehicle.brand}
                            </span>
                          </li>
                          <li className="flex flex-col gap-1">
                            <span className="text-muted-foreground text-sm">
                              Tipo
                            </span>{" "}
                            <span className="font-medium">
                              {formatText(vehicle.type)} - {vehicle.model}
                            </span>
                          </li>
                          <li className="flex flex-col gap-1">
                            <span className="text-muted-foreground text-sm">
                              Color
                            </span>{" "}
                            <span className="font-medium capitalize">
                              {vehicle.color}
                            </span>
                          </li>
                          <li className="flex flex-col gap-1">
                            <span className="text-muted-foreground text-sm">
                              Matrícula
                            </span>{" "}
                            <span className="font-medium capitalize">
                              {vehicle.plate}
                            </span>
                          </li>
                          {vehicle.caracteristics && (
                            <li className="flex flex-col gap-1">
                              <span className="text-muted-foreground text-sm">
                                Características
                              </span>{" "}
                              <span className="font-medium capitalize">
                                {vehicle.caracteristics}
                              </span>
                            </li>
                          )}
                        </ul>
                      </CardContent>
                    </Card>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="my-10 text-center">
              <p className="text-muted-foreground text-center inline-flex items-center">
                Aquí aparecerán los vehículos asegurados{" "}
                <ArrowDownToLine className="ml-2 w-4 h-4" />
              </p>
            </div>
          )}
        </div>
        <div>
          <h3 className="text-xl font-bold">Objetos asegurados</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-end">
          <div className="space-y-2">
            <Label>Tipo de objeto</Label>
            <Select
              value={securedObject.type}
              onValueChange={(value) =>
                setSecuredObject({ ...securedObject, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Tipo de objeto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cellphones">Celulares</SelectItem>
                <SelectItem value="cash">Efectivo</SelectItem>
                <SelectItem value="electronics">Electrónicos</SelectItem>
                <SelectItem value="tools">Herramientas</SelectItem>
                <SelectItem value="others">Otros</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 xl:col-span-5">
            <Label>Descripción</Label>
            <Textarea
              placeholder="Escribe detalles de los objetos asegurados"
              className="resize-none"
              value={securedObject.description}
              rows={5}
              onChange={(e) =>
                setSecuredObject({
                  ...securedObject,
                  description: e.target.value,
                })
              }
            />
          </div>
          <div>
            <Button
              type="button"
              className="w-full"
              onClick={() => addSecuredObject(securedObject)}
            >
              Agregar
            </Button>
          </div>
        </div>
        <div>
          {securedObjects.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {securedObjects.map((item, index) => {
                let image = "/icons/objects/electronics.png";
                let objectType = item.type;

                switch (item.type) {
                  case "electronics":
                    image = "/icons/objects/electronics.png";
                    objectType = "Electrónicos";
                    break;

                  case "cellphones":
                    image = "/icons/objects/cellphones.png";
                    objectType = "Celulares";
                    break;

                  case "tools":
                    image = "/icons/objects/tools.png";
                    objectType = "Herramientas";
                    break;

                  case "cash":
                    image = "/icons/objects/cash.png";
                    objectType = "Efectivo";
                    break;

                  case "others":
                    image = "/icons/objects/others.png";
                    objectType = "Otros";
                    break;
                }

                return (
                  <li key={index}>
                    <Card>
                      <CardHeader>
                        <div className="inline-flex items-start justify-between">
                          <div className="bg-secondary flex items-center justify-center w-20 h-20 rounded-2xl">
                            <Image
                              src={image}
                              alt="Object"
                              width={500}
                              height={500}
                              className="w-14 h-14 object-cover"
                            />
                          </div>
                          <div>
                            <Button
                              type="button"
                              size="icon"
                              variant="outline"
                              onClick={() => removeSecuredObject(index)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 bg-secondary p-3 rounded-xl">
                          <li className="flex flex-col gap-1">
                            <span className="text-muted-foreground text-sm">
                              Tipo de objeto
                            </span>{" "}
                            <span className="font-medium">{objectType}</span>
                          </li>
                          <li className="flex flex-col gap-1">
                            <span className="text-muted-foreground text-sm">
                              Descripción
                            </span>{" "}
                            <span className="font-medium">
                              {item.description}
                            </span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="my-10 text-center">
              <p className="text-muted-foreground text-center inline-flex items-center">
                Aquí aparecerán los objetos asegurados{" "}
                <ArrowDownToLine className="ml-2 w-4 h-4" />
              </p>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="informativeSheet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fichas informativas (cantidad)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Fichas informativas (cantidad)"
                    type="number"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="officesMP"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Oficios M.P. (cantidad)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Oficios M.P. (cantidad)"
                    type="number"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-end">
          <FormField
            control={form.control}
            name="deliveryDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha de entrega</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? format(
                              field.value instanceof Date
                                ? field.value
                                : parse(field.value, "dd/MM/yyyy", new Date()),
                              "dd MMM, yyyy",
                              { locale: es }
                            )
                          : ""}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      locale={es}
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deliveryHour"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hora de entrega</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value ? String(field.value) : undefined}
                  defaultValue={field.value ? String(field.value) : undefined}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Hora de entrega" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="01:00">01:00 Hrs</SelectItem>
                    <SelectItem value="02:00">02:00 Hrs</SelectItem>
                    <SelectItem value="03:00">03:00 Hrs</SelectItem>
                    <SelectItem value="04:00">04:00 Hrs</SelectItem>
                    <SelectItem value="05:00">05:00 Hrs</SelectItem>
                    <SelectItem value="06:00">06:00 Hrs</SelectItem>
                    <SelectItem value="07:00">07:00 Hrs</SelectItem>
                    <SelectItem value="08:00">08:00 Hrs</SelectItem>
                    <SelectItem value="09:00">09:00 Hrs</SelectItem>
                    <SelectItem value="10:00">10:00 Hrs</SelectItem>
                    <SelectItem value="11:00">11:00 Hrs</SelectItem>
                    <SelectItem value="12:00">12:00 Hrs</SelectItem>
                    <SelectItem value="13:00">13:00 Hrs</SelectItem>
                    <SelectItem value="14:00">14:00 Hrs</SelectItem>
                    <SelectItem value="15:00">15:00 Hrs</SelectItem>
                    <SelectItem value="16:00">16:00 Hrs</SelectItem>
                    <SelectItem value="17:00">17:00 Hrs</SelectItem>
                    <SelectItem value="18:00">18:00 Hrs</SelectItem>
                    <SelectItem value="19:00">19:00 Hrs</SelectItem>
                    <SelectItem value="20:00">20:00 Hrs</SelectItem>
                    <SelectItem value="21:00">21:00 Hrs</SelectItem>
                    <SelectItem value="22:00">22:00 Hrs</SelectItem>
                    <SelectItem value="23:00">23:00 Hrs</SelectItem>
                    <SelectItem value="24:00">24:00 Hrs</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          size="lg"
          className="fixed bottom-5 right-5 rounded-full"
        >
          {isLoading && <Loader className="w-4 h-4 mr-3 animate-spin" />}
          Actualizar investigación
        </Button>
      </form>
    </Form>
  );
};
