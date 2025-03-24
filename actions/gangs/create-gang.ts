"use server";

import {z} from "zod";

import {db} from "@/lib/db/db";
import {gangs, NewGang} from "@/lib/db/schema";

import {formSchemaCreateGang} from "@/types/gang";

interface CreateGangProps {
  values: z.infer<typeof formSchemaCreateGang>;
}

export const createGang = async ({values}: CreateGangProps) => {
  try {
    const {name, location, members} = values;

    const NewGang: NewGang = {
      name,
      location,
      members,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await db.insert(gangs).values(NewGang);

    return {response: "success", message: "Pandilla creada"};
  } catch (error) {
    return {response: "error", message: `Ha ocurrido un error: ${error}`};
  }
};
