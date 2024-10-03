"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { editRolUser } from "@/actions/users/edit-role";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formSchemaEditRolUser } from "@/types/user";
import { Loader } from "lucide-react";
import { User } from "@/lib/db/schema";

interface EditRoleUserFormProps {
  data: User;
}

export function EditRoleUserForm({ data }: EditRoleUserFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchemaEditRolUser>>({
    resolver: zodResolver(formSchemaEditRolUser),
    defaultValues: {
      role:
        data &&
        (["default", "admin", "support"] as const).includes(
          data.role as "default" | "admin" | "support"
        )
          ? (data.role as "default" | "admin" | "support")
          : "default",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchemaEditRolUser>) {
    setIsLoading(true);

    const res = await editRolUser({ values, id: data.id });

    if (res?.response === "success") {
      router.refresh();
      toast.success(res?.message);
    } else {
      toast.error(res?.message);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex flex-row items-start justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Administrador
                        </FormLabel>
                        <FormDescription>
                          Tiene acceso total al sistema, puede gestionar
                          usuarios, modificar configuraciones, y acceder a todas
                          las funcionalidades y datos de la plataforma.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <RadioGroupItem value="admin" />
                      </FormControl>
                    </FormItem>
                    <FormItem className="flex flex-row items-start justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Soporte</FormLabel>
                        <FormDescription>
                          Encargado de asistir a los usuarios, puede ver y
                          gestionar incidencias o solicitudes, pero tiene acceso
                          limitado a las configuraciones principales del
                          sistema.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <RadioGroupItem value="support" />
                      </FormControl>
                    </FormItem>
                    <FormItem className="flex flex-row items-start justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Default</FormLabel>
                        <FormDescription>
                          Usuario estándar con acceso restringido, puede
                          utilizar las funciones básicas del sistema sin
                          permisos especiales para realizar modificaciones
                          administrativas.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <RadioGroupItem value="default" />
                      </FormControl>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader className="w-4 h-4 mr-3 animate-spin" />}
          Asignar rol
        </Button>
      </form>
    </Form>
  );
}
