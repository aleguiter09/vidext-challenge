import { Document, DocumentSchema } from "@/schemas/document";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "documents.json");

function readDocuments(): Record<string, Document> {
  if (!fs.existsSync(filePath)) return {};
  const raw = fs.readFileSync(filePath, "utf-8");
  try {
    return JSON.parse(raw) as Record<string, Document>;
  } catch {
    return {};
  }
}

function writeDocuments(docs: Record<string, Document>) {
  fs.writeFileSync(filePath, JSON.stringify(docs, null, 2));
}

export function getDocument(id: number): Document | null {
  const docs = readDocuments();
  return docs[id] ?? null;
}

export function saveDocument(id: number, snapshot: unknown): Document {
  const docs = readDocuments();
  const now = new Date();
  const existing = docs[id];

  const newDoc: Document = {
    id,
    title: existing?.title ?? undefined,
    snapshot,
    createdAt: existing?.createdAt ? new Date(existing.createdAt) : now,
    updatedAt: now,
  };

  DocumentSchema.parse(newDoc);

  docs[id] = newDoc;
  writeDocuments(docs);

  return newDoc;
}
