import z from "zod";
import { CreateClientSchema } from "./create-client.schema";

export const UpdateClientSchema = CreateClientSchema.partial().extend({
  id: z.string(),
});

export type UpdateClientInput = z.infer<typeof UpdateClientSchema>;
