"use client";

import { Document } from "@/schemas/document";
import "tldraw/tldraw.css";

export function EditorClient({
  data,
}: Readonly<{ data?: Pick<Document, "id" | "snapshot"> }>) {
  return <div className="w-screen h-screen">{JSON.stringify(data)}</div>;
}
