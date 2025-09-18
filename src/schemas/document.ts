import { type TLEditorSnapshot } from "tldraw";
import { z } from "zod";

export const DocumentSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  snapshot: z.custom<TLEditorSnapshot>().optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type Document = z.infer<typeof DocumentSchema>;

export const DocumentInputSchema = z.object({
  id: z.string(),
  snapshot: z.custom<TLEditorSnapshot>().optional(),
});
