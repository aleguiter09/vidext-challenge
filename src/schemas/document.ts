import { z } from "zod";

export const DocumentSchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  snapshot: z.unknown(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type Document = z.infer<typeof DocumentSchema>;

export const DocumentInputSchema = z.object({
  id: z.number(),
  snapshot: z.unknown(),
});
