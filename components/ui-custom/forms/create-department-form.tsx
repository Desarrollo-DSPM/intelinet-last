"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { createDepartment } from "@/actions/departments/create-department";
import { formSchemaCreateDepartment } from "@/types/department";

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

interface CreateDepartmentFormProps {
  onCloseModal: Dispatch<SetStateAction<boolean>>;
}

export const CreateDepartmentForm = ({
  onCloseModal,
}: CreateDepartmentFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchemaCreateDepartment>>({
    resolver: zodResolver(formSchemaCreateDepartment),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchemaCreateDepartment>) {
    setIsLoading(true);
    const res = await createDepartment({
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
                <Input
                  placeholder="Desarrollo y tecnología"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader className="w-4 h-4 mr-3 animate-spin" />}
          Crear departamento
        </Button>
      </form>
    </Form>
  );
};
