import { Document, DocumentSchema } from "@/schemas/document";
import { TLEditorSnapshot } from "tldraw";
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

export function getDocument(id: string): Document | null {
  const docs = readDocuments();
  return docs[id] ?? null;
}

export function getAll(): Document[] {
  const docs = readDocuments();
  return docs ? Object.values(docs) : [];
}

export function saveDocument(
  id: string,
  snapshot: TLEditorSnapshot,
  title: string
): Document {
  const docs = readDocuments();
  const now = new Date();
  const existing = docs[id];

  const newDoc: Document = {
    id,
    title,
    snapshot,
    createdAt: existing?.createdAt ? new Date(existing.createdAt) : now,
    updatedAt: now,
  };

  DocumentSchema.parse(newDoc);

  docs[id] = newDoc;
  writeDocuments(docs);

  return newDoc;
}

export function deleteDocument(id: string): void {
  const docs = readDocuments();
  delete docs[id];
  writeDocuments(docs);
}
