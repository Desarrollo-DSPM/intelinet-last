"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { editModule } from "@/actions/modules/edit-module";
import { Module } from "@/lib/db/schema";
import { formSchemaEditModule } from "@/types/module";

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

interface EditModuleFormProps {
  data: Module;
}

export const EditModuleForm = ({ data }: EditModuleFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchemaEditModule>>({
    resolver: zodResolver(formSchemaEditModule),
    defaultValues: {
      name: data.name!,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchemaEditModule>) {
    setIsLoading(true);

    const res = await editModule({ values, id: data.id });

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input
                  placeholder="Desarrollo"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader className="w-4 h-4 mr-3 animate-spin" />}
          Editar módulo
        </Button>
      </form>
    </Form>
  );
};
