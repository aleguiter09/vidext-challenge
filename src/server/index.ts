import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { publicProcedure, router } from "./trpc";
import { DocumentInputSchema, DocumentSchema } from "@/schemas/document";
import { deleteDocument, getAll, getDocument, saveDocument } from "./fileStore";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

  suggestTitle: publicProcedure
    .input(DocumentSchema.pick({ snapshot: true }))
    .mutation(async ({ input }) => {
      try {
        const snapshotText = JSON.stringify(input.snapshot).slice(0, 500);

        const { text } = await generateText({
          model: openai("gpt-4o-mini"),
          prompt: `Suggest a short, descriptive title for this canvas: ${snapshotText}`,
        });

        return {
          title: text.trim(),
        };
      } catch (e) {
        console.error(e);
        return { title: "Untitled Document (AI unavailable)" };
      }
    }),
});

export type AppRouter = typeof appRouter;
