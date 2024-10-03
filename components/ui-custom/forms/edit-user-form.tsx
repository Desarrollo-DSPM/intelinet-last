"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { editUser } from "@/actions/users/edit-user";
import { formSchemaEditUser } from "@/types/user";

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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Loader } from "lucide-react";
import { Department, User } from "@/lib/db/schema";
import { getAllDepartments } from "@/actions/departments/get-all-departments";

interface EditUserFormProps {
  data: User;
}

export const EditUserForm = ({ data }: EditUserFormProps) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllDepartments();
        setDepartments(response.data);
      } catch (error) {
        setDepartments([]);
        console.log(error);
      }
    })();
  }, []);

  const form = useForm<z.infer<typeof formSchemaEditUser>>({
    resolver: zodResolver(formSchemaEditUser),
    defaultValues: {
      departmentId: data?.departmentId ?? 0,
      name: data?.name ?? "",
      lastname: data?.lastname ?? "",
      employeeNumber: data?.employeeNumber ?? 0,
      email: data?.email ?? "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchemaEditUser>) {
    setIsLoading(true);

    const res = await editUser({ values, id: data.id });

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
        <div className="flex items-center gap-5">
          <div className="w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre(s)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Jorge Luis Trejo"
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
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellidos</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Trejo"
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
              name="employeeNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de empleado</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123456"
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
        <FormField
          control={form.control}
          name="departmentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Departamento</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                value={field.value ? String(field.value) : undefined}
                defaultValue={field.value ? String(field.value) : undefined}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el departamento" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0">Selecciona el departamento</SelectItem>
                  {departments.map((department) => (
                    <SelectItem
                      key={department.id}
                      value={String(department.id)}
                    >
                      {department.name}
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input
                  placeholder="test@test.com"
                  type="email"
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input
                  placeholder="*********"
                  type="password"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Si no deseas cambiar la contraseña, deja este campo vacío.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader className="w-4 h-4 mr-3 animate-spin" />}
          Editar información
        </Button>
      </form>
    </Form>
  );
};
