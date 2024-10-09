"use client";

import { getAllEventTypes } from "@/actions/event/get-all-event-types";
import { createInitFormat } from "@/actions/formats/create-init-format";
import { getAllUsers } from "@/actions/users/get-users";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";
import { EventType, UserWithDepartment } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { formSchemaInitFormat } from "@/types/format";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const CreateInitFormatForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [users, setUsers] = useState<UserWithDepartment[]>([]);
    const [eventTypes, setEventTypes] = useState<EventType[]>([]);
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
                const responseEventTypes = await getAllEventTypes();
                setEventTypes(responseEventTypes.data);
            } catch (error) {
                setUsers([]);
                console.log(error);
            }
        })();
    }, []);

    const addFolio = (type : string) => {
        if (type === "call") {
            setCallFolios([...callFolios, callFolio]);
            setCallFolio("");
        } else {
            setIphFolios([...iphFolios, iphFolio]);
            setIphFolio("");
        }
    }

    const removeFolio = (folio : string, type : string) => {
        if (type === "call") {
            setCallFolios(callFolios.filter(f => f !== folio));
            setCallFolio("");
        } else {
            setIphFolios(iphFolios.filter(f => f !== folio));
            setIphFolio("");
        }
    }

    const form = useForm<z.infer<typeof formSchemaInitFormat>>({
        resolver: zodResolver(formSchemaInitFormat),
        defaultValues: {
            userId: auth?.id,
            group: "",
            supportUserId: undefined,
            district: undefined,
            eventTypeId: undefined,
            eventDate: new Date(),
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

    async function onSubmit(values: z.infer<typeof formSchemaInitFormat>) {
        setIsLoading(true);

        const valuesForm = {
            ...values,
            callFolios: JSON.stringify(callFolios),
            iphFolios: JSON.stringify(iphFolios),
        };

        const res = await createInitFormat({ values: valuesForm });

        if (res?.response === "success") {
            router.refresh();
            toast.success(res.message);
            form.reset();
        } else {
            toast.error(res.message);
        }

        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex items-center gap-5">
                <div className="w-full space-y-5">
                    <FormField
                        control={form.control}
                        name="userId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre del Elemento</FormLabel>
                                <Select
                                    // onValueChange={(value) => field.onChange(Number(value))}
                                    value={field.value ? String(field.value) : undefined}
                                    defaultValue={field.value ? String(field.value) : undefined}
                                    disabled={true}
                                >
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona el Elemento" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    <SelectItem value="0">Selecciona el Elemento</SelectItem>
                                    {users.map((user) => (
                                        <SelectItem
                                        key={user.id}
                                        value={String(user.id)}
                                        >
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
                                    {/* <SelectItem value="0">Selecciona el Grupo</SelectItem> */}
                                        <SelectItem value="uap">UAP</SelectItem>
                                        <SelectItem value="uedg">UEDG</SelectItem>
                                        <SelectItem value="uip">UIP</SelectItem>
                                        <SelectItem value="criminalistica">Criminalística</SelectItem>
                                        <SelectItem value="uarc">UARC</SelectItem>
                                        <SelectItem value="uiie">UIIE</SelectItem>
                                        <SelectItem value="gapavi">GAPAVI</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                                    {/* <SelectItem value="0">Selecciona el Elemento que brindó Apoyo</SelectItem> */}
                                    {users.map((user) => (
                                        <SelectItem
                                        key={user.id}
                                        value={String(user.id)}
                                        >
                                        {user.name +  " " + user.lastname}
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
                                        {/* <SelectItem value="0">Selecciona el Distrito</SelectItem> */}
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
                        name="eventTypeId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tipo de Evento</FormLabel>
                                <Select
                                    onValueChange={(value) => field.onChange(Number(value))}
                                    value={field.value ? String(field.value) : undefined}
                                    defaultValue={field.value ? String(field.value) : undefined}
                                >
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona el Tipo de Evento" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    <SelectItem value="0">Selecciona el Tipo de Evento</SelectItem>
                                    {eventTypes.map((eventType) => (
                                        <SelectItem
                                        key={eventType.id}
                                        value={String(eventType.id)}
                                        >
                                        {eventType.name}
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
                        name="eventDate"
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
                                            format(field.value, "PPP")
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
                                        selected={field.value}
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
                        <div className="flex-1">
                            <Label htmlFor="callFolio">Llamada 9.1.1.</Label>
                            <Input type="text" id="callFolio" value={callFolio} onChange={(e) => setCallFolio(e.target.value)} />
                        </div>
                        <Button type="button" onClick={() => addFolio("call")}>Agregar Folio Llamada</Button>
                    </div>
                    <div>
                        <p className="text-muted-foreground">
                            Total: {callFolios.length} Llamadas 9.1.1.
                        </p>
                        <ul className="space-y-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 items-end gap-3">
                            {callFolios.length > 0 && callFolios.map(folio => {
                                return <li key={folio}>
                                    <Card>
                                        <CardHeader className="flex-row items-center gap-5">
                                            <h4 className="flex-1">Llamada: <span className="font-medium">{folio}</span></h4>
                                            <TooltipProvider delayDuration={100}>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <Button type="button" size="icon" variant="outline" onClick={() => removeFolio(folio, "call")}><Trash className="w-4 h-4" /></Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Eliminar Llamada</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </CardHeader>
                                    </Card>
                                </li>
                            })}
                        </ul>
                    </div>
                    <div className="flex items-end gap-5">
                        <div className="flex-1">
                            <Label htmlFor="iphFolio">IPH</Label>
                            <Input type="text" id="iphFolio" value={iphFolio} onChange={(e) => setIphFolio(e.target.value)} />
                        </div>
                        <Button type="button" onClick={() => addFolio("iph")}>Agregar Folio IPH</Button>
                    </div>
                    <div>
                        <p className="text-muted-foreground">
                            Total: {iphFolios.length} IPHs
                        </p>
                        <ul className="space-y-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 items-end gap-3">
                            {iphFolios.length > 0 && iphFolios.map(folio => {
                                return <li key={folio}>
                                    <Card>
                                        <CardHeader className="flex-row items-center gap-5">
                                            <h4 className="flex-1">IPH: <span className="font-medium">{folio}</span></h4>
                                            <TooltipProvider delayDuration={100}>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <Button type="button" size="icon" variant="outline" onClick={() => removeFolio(folio, "iph")}><Trash className="w-4 h-4" /></Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Eliminar IPH</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </CardHeader>
                                    </Card>
                                </li>
                            })}
                        </ul>
                    </div>
                    <FormField
                        control={form.control}
                        name="victimInv"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Entrevista por Investigación a Víctimas</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Investigación a Víctimas (cantidad)"
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
                                <FormLabel>Entrevista por Investigación a Testigos</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Investigación a Testigos (cantidad)"
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
                                <FormLabel>Entrevista por Investigación a Imputados</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Investigación a Imputados (cantidad)"
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
                                        placeholder="Cantidad de Fotos"
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
                                <FormLabel>Vídeo Grabaciones</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Cantidad de Videos"
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
            <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader className="w-4 h-4 mr-3 animate-spin" />}
                Guardar Formato de Inicio
            </Button>
        </form>
    </Form>
  );
}