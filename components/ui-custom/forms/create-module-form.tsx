"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { createModule } from "@/actions/modules/create-module";
import { formSchemaCreateModule } from "@/types/module";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Loader } from "lucide-react";

interface CreateModuleFormProps {
  onCloseModal: Dispatch<SetStateAction<boolean>>;
}

export const CreateModuleForm = ({ onCloseModal }: CreateModuleFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchemaCreateModule>>({
    resolver: zodResolver(formSchemaCreateModule),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchemaCreateModule>) {
    setIsLoading(true);

    // Validar que el nombre del módulo solo contenga letras y números
    const regex = /^[a-zA-Z0-9]+$/;

    if (!regex.test(values.name)) {
      toast.error("El nombre del módulo solo puede contener letras y números");
      setIsLoading(false);
      return;
    }

    const res = await createModule({
      values,
    });

    if (res?.response === "success") {
      router.refresh();
      toast.success(res?.message);
      onCloseModal(false);
    } else {
      toast.error(res?.message);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="UAP" disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader className="w-4 h-4 mr-3 animate-spin" />}
          Crear módulo
        </Button>
      </form>
    </Form>
  );
};
