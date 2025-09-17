"use client";

import { trpc } from "@/providers/TRPCProvider";
import "tldraw/tldraw.css";

export function EditorClient({ id }: Readonly<{ id?: number }>) {
  if (!id) return <div className="p-4">No document ID provided</div>;

  const { data, isLoading, error } = trpc.getDocument.useQuery({ id });

  if (isLoading) return <div className="p-4">Loading document...</div>;
  if (error)
    return <div className="p-4 text-red-500">Error loading document</div>;

  return <div className="w-screen h-screen">{JSON.stringify(data)}</div>;
}
