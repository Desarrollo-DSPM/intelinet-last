"use client";

import {useTransition} from "react";
import {useRouter} from "next/navigation";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {toast} from "sonner";

import {signIn} from "@/actions/users/login";
import {formSchemaLogin} from "@/types/user";

import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Loader} from "lucide-react";

export const FormLogin = () => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchemaLogin>>({
    resolver: zodResolver(formSchemaLogin),
    defaultValues: {
      employeeNumber: 0,
      password: ""
    }
  });

  async function onSubmit(values: z.infer<typeof formSchemaLogin>) {
    startTransition(async () => {
      const res = await signIn(values);
      if (res?.response === "success") {
        router.push("/dashboard");
      } else {
        toast.error(res?.message);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="employeeNumber"
          render={({field}) => (
            <FormItem>
              <FormLabel>Número de empleado</FormLabel>
              <FormControl>
                <Input
                  placeholder="123456789"
                  type="number"
                  disabled={isPending}
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
          render={({field}) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input
                  placeholder="*********"
                  type="password"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Loader className="w-4 h-4 mr-3 animate-spin" />}
          Ingresar
        </Button>
      </form>
    </Form>
  );
};
