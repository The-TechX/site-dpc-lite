import { z } from "zod";

export const ClientSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters long"),
  logoUrl: z.url("Logo URL must be a valid URL").optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Client = z.infer<typeof ClientSchema>;
