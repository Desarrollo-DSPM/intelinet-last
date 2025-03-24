"use client";

import {Dispatch, SetStateAction, useTransition} from "react";
import {useRouter} from "next/navigation";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {toast} from "sonner";

import {createGang} from "@/actions/gangs/create-gang";
import {formSchemaCreateGang} from "@/types/gang";

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

interface FormCreateGangProps {
  onCloseModal: Dispatch<SetStateAction<boolean>>;
}

export const FormCreateGang = ({onCloseModal}: FormCreateGangProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchemaCreateGang>>({
    resolver: zodResolver(formSchemaCreateGang),
    defaultValues: {
      name: "",
      location: "",
      members: 0
    }
  });

  async function onSubmit(values: z.infer<typeof formSchemaCreateGang>) {
    startTransition(async () => {
      const res = await createGang({
        values
      });

      if (res?.response === "success") {
        router.refresh();
        toast.success(res?.message);
        onCloseModal(false);
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
          name="name"
          render={({field}) => (
            <FormItem>
              <FormLabel>
                Nombre <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Relockos 24"
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
          name="location"
          render={({field}) => (
            <FormItem>
              <FormLabel>
                Ubicación <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enseguida del Cbtis 122, en Villa Juarez."
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
          name="members"
          render={({field}) => (
            <FormItem>
              <FormLabel>
                Número de integrantes <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="24"
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
          Crear pandilla
        </Button>
      </form>
    </Form>
  );
};
