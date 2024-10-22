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
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
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
  SelectItem,
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
import { formSchemaEditInvestigation } from "@/types/investigation";
import { ArrowDownToLine, CalendarIcon, Loader, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface EditInvestigationFormProps {
  investigation: InvestigationWithDetails;
}

interface People {
  name: string;
  address: string;
  plate: string;
  phone: string;
}

interface SocialNetwork {
  name: string;
  url: string;
}

export const EditInvestigationForm = ({
  investigation,
}: EditInvestigationFormProps) => {
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
    },
  });

  async function onSubmit(values: z.infer<typeof formSchemaEditInvestigation>) {
    setIsLoading(true);

    const valuesForm = {
      ...values,
      callFolios: JSON.stringify(callFolios),
      iphFolios: JSON.stringify(iphFolios),
      people: JSON.stringify(people),
      socialNetworks: JSON.stringify(socialNetworks),
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
    } else {
      toast.error(res.message);
    }

    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                      date < new Date(new Date().setHours(0, 0, 0, 0))
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
        <div>
          <h3 className="text-xl font-bold">Personas</h3>
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
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader className="w-4 h-4 mr-3 animate-spin" />}
          Editar investigación
        </Button>
      </form>
    </Form>
  );
};
