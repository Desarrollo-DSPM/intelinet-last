"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const CreateFormatoInicioForm = () => {
    const form = useForm({
        resolver: zodResolver(formSchemaCreateFormatoInicio),
        defaultValues: {
            elementName: "",
        },
    });
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex items-center gap-5">
                <div className="w-full">
                    <FormField
                        control={form.control}
                        name="elementName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre del Elemento</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder=""
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
        </form>
    </Form>
  );
}