"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { getAllInvestigationsTypes } from "@/actions/investigations/get-all-investigations-types";
import { createInvestigation } from "@/actions/investigations/create-investigation";
import { getAllUsers } from "@/actions/users/get-users";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { InvestigationType, UserWithDepartment } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { formSchemaCreateInvestigation } from "@/types/investigation";
import { ArrowDownToLine, CalendarIcon, Loader, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const CreateInvestigationForm = () => {
  const group = useSearchParams().get("group");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<UserWithDepartment[]>([]);
  const [investigationTypes, setInvestigationTypes] = useState<
    InvestigationType[]
  >([]);
  const [callFolios, setCallFolios] = useState<string[]>([]);
  const [callFolio, setCallFolio] = useState<string>("");
  const [iphFolios, setIphFolios] = useState<string[]>([]);
  const [iphFolio, setIphFolio] = useState<string>("");

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

  const form = useForm<z.infer<typeof formSchemaCreateInvestigation>>({
    resolver: zodResolver(formSchemaCreateInvestigation),
    defaultValues: {
      group: group ? group : "",
      supportUserId: undefined,
      district: undefined,
      investigationTypeId: undefined,
      investigationDate: new Date(),
      location: "",
      physicalVictim: "",
      moralVictim: "",
      victimInv: 0,
      witnessInv: 0,
      invAccused: 0,
      photoCount: 0,
      videoCount: 0,
    },
  });

  async function onSubmit(
    values: z.infer<typeof formSchemaCreateInvestigation>
  ) {
    setIsLoading(true);

    const valuesForm = {
      ...values,
      callFolios: JSON.stringify(callFolios),
      iphFolios: JSON.stringify(iphFolios),
    };

    if (!auth?.id) {
      toast.error("User ID is undefined");
      setIsLoading(false);
      return;
    }

    const res = await createInvestigation({
      userId: auth.id,
      values: valuesForm,
    });

    if (res?.response === "success") {
      router.refresh();
      toast.success(res.message);
      form.reset();
    } else {
      toast.error(res.message);
    }

    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {!group && (
          <FormField
            control={form.control}
            name="group"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grupo</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value ? String(field.value) : undefined}
                  defaultValue={field.value ? String(field.value) : undefined}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el Grupo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="uap">UAP</SelectItem>
                    <SelectItem value="uedg">UEDG</SelectItem>
                    <SelectItem value="uip">UIP</SelectItem>
                    <SelectItem value="criminalistica">
                      Criminalística
                    </SelectItem>
                    <SelectItem value="uarc">UARC</SelectItem>
                    <SelectItem value="uiie">UIIE</SelectItem>
                    <SelectItem value="gapavi">GAPAVI</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
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
              <FormLabel>Fecha del Evento</FormLabel>
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
                      {field.value ? (
                        format(field.value, "dd MMM, yyyy")
                      ) : (
                        <span>Escoja una fecha </span>
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
          {callFolios.length > 0 ? (
            <ul className="flex items-center gap-4 flex-wrap">
              {callFolios.map((folio) => (
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
              ))}
            </ul>
          ) : (
            <div className="my-10 text-center">
              <p className="text-muted-foreground text-center inline-flex items-center">
                Aquí aparecerán los folios de las llamadas
                <ArrowDownToLine className="ml-2 w-4 h-4" />
              </p>
            </div>
          )}
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
          {iphFolios.length > 0 ? (
            <ul className="flex items-center gap-4 flex-wrap">
              {iphFolios.map((folio) => (
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
              ))}
            </ul>
          ) : (
            <div className="my-10 text-center">
              <p className="text-muted-foreground text-center inline-flex items-center">
                Aquí aparecerán los folios de los IPH
                <ArrowDownToLine className="ml-2 w-4 h-4" />
              </p>
            </div>
          )}
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
                <FormLabel>Serie Fotográfica del Lugar de los Hechos</FormLabel>
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
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader className="w-4 h-4 mr-3 animate-spin" />}
          Crear investigación
        </Button>
      </form>
    </Form>
  );
};
