import { z } from "zod";
import { ClientSchema } from "./client.schema";

export const CreateClientSchema = ClientSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateClientInput = z.infer<typeof CreateClientSchema>;
