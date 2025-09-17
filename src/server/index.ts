import { publicProcedure, router } from "./trpc";
import { DocumentInputSchema } from "@/schemas/document";
import { getDocument, saveDocument } from "./fileStore";

export const appRouter = router({
  getDocument: publicProcedure
    .input(DocumentInputSchema.pick({ id: true }))
    .query(async ({ input }) => {
      const doc = getDocument(input.id);
      if (!doc) return { id: input.id, snapshot: null };
      return { id: input.id, snapshot: doc.snapshot };
    }),

  saveDocument: publicProcedure
    .input(DocumentInputSchema)
    .mutation(async ({ input }) => {
      const saved = saveDocument(input.id, input.snapshot);
      return { id: input.id, snapshot: saved };
    }),

  getAll: publicProcedure.query(async () => {
    return [1, 2, 3, 4, 5];
  }),
});

export type AppRouter = typeof appRouter;
