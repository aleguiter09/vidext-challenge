import { publicProcedure, router } from "./trpc";
import { DocumentInputSchema } from "@/schemas/document";
import { deleteDocument, getAll, getDocument, saveDocument } from "./fileStore";
import z from "zod";

export const appRouter = router({
  getDocument: publicProcedure
    .input(DocumentInputSchema.pick({ id: true }))
    .query(async ({ input }) => {
      const doc = getDocument(input.id);
      if (!doc) return { id: input.id, snapshot: undefined, title: "" };
      return { id: input.id, snapshot: doc.snapshot, title: doc.title };
    }),

  saveDocument: publicProcedure
    .input(DocumentInputSchema)
    .mutation(async ({ input }) => {
      if (!input.snapshot || !input.title) return;

      const saved = saveDocument(input.id, input.snapshot, input.title);
      return { id: input.id, snapshot: saved, title: input.title };
    }),

  getAll: publicProcedure.query(async () => {
    return getAll();
  }),

  deleteDocument: publicProcedure
    .input(DocumentInputSchema.pick({ id: true }))
    .mutation(async ({ input }) => {
      deleteDocument(input.id);
    }),
});

export type AppRouter = typeof appRouter;
