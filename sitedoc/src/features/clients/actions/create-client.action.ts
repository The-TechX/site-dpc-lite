"use server";

import { createClient } from "./create-client.use-case";
import { CreateClientSchema } from "../schemas/create-client.schema";

export async function createClientAction(formData: FormData) {
  const input = {
    name: formData.get("name"),
    logoUrl: formData.get("logoUrl"),
  };

  const data = CreateClientSchema.safeParse(input);

  if (!data.success) {
    throw new Error("Invalid input");
  }

  await createClient(data.data);
}
