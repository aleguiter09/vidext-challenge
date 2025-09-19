import "server-only";

import { type Document, DocumentSchema } from "@/schemas/document";
import type { TLEditorSnapshot } from "tldraw";
import fs from "fs";
import path from "path";
import { Redis } from "@upstash/redis";

const useRedis =
  !!process.env.KV_URL &&
  !!process.env.KV_REST_API_URL &&
  !!process.env.KV_REST_API_TOKEN &&
  !!process.env.KV_REST_API_READ_ONLY_TOKEN &&
  !!process.env.REDIS_URL &&
  !!process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = useRedis
  ? new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

const DOCS_ZSET = "docs:z"; // índice ordenado por updatedAt
const docKey = (id: string) => `doc:${id}`;

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

export async function getAll(): Promise<Document[]> {
  if (useRedis && redis) {
    const ids = await redis.zrange<string[]>(DOCS_ZSET, 0, -1, { rev: true });
    if (!ids?.length) return [];

    const docs: (Document | null)[] = await Promise.all(
      ids.map(async (id) => {
        const h = await redis.hgetall<Record<string, string>>(docKey(id));
        if (!h) return null;
        return {
          id,
          title: h.title ?? "",
          snapshot: (() => {
            try {
              return h.snapshot ? JSON.parse(h.snapshot) : {};
            } catch {
              return {};
            }
          })(),
          createdAt: h.createdAt ? new Date(h.createdAt) : new Date(),
          updatedAt: h.updatedAt ? new Date(h.updatedAt) : new Date(),
        };
      })
    );

    return docs.filter(Boolean) as Document[];
  }

  const docs = readDocuments();
  return docs ? Object.values(docs) : [];
}

export async function getDocument(id: string): Promise<Document | null> {
  if (useRedis && redis) {
    const h = await redis.hgetall(docKey(id));
    if (!h) return null;

    return {
      id,
      title: (h.title as string) ?? "",
      snapshot: h.snapshot ? (h.snapshot as TLEditorSnapshot) : undefined,
      createdAt: h.createdAt ? new Date(h.createdAt as string) : new Date(),
      updatedAt: h.updatedAt ? new Date(h.updatedAt as string) : new Date(),
    };
  }

  const docs = readDocuments();
  return docs[id] ?? null;
}

export async function saveDocument(
  id: string,
  snapshot: TLEditorSnapshot,
  title: string
): Promise<void> {
  const now = new Date();

  if (useRedis && redis) {
    const existing = await redis.hgetall<Record<string, string>>(docKey(id));
    const createdAt = existing?.createdAt ?? now;

    await redis.hset(docKey(id), {
      title: title,
      snapshot: JSON.stringify(snapshot ?? {}),
      createdAt,
      updatedAt: now.toISOString(),
    });

    await redis.zadd(DOCS_ZSET, { score: Date.now(), member: id });
    return;
  }

  const docs = readDocuments();
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
}

export async function deleteDocument(id: string): Promise<void> {
  if (useRedis && redis) {
    await redis.del(docKey(id));
    await redis.zrem(DOCS_ZSET, id);
    return;
  }

  const docs = readDocuments();
  delete docs[id];
  writeDocuments(docs);
}
