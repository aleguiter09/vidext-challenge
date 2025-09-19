"use client";

import { trpc } from "@/providers/TRPCProvider";
import { Canva } from "@/components/Canva";
import { Loader2 } from "lucide-react";

export function EditorClient({ id }: Readonly<{ id: string }>) {
  const { data, isLoading } = trpc.getDocument.useQuery({ id });

  if (isLoading || !data) {
    return (
      <div className="w-full h-full relative flex justify-center items-center">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  return <Canva id={id} snapshot={data.snapshot} title={data.title} />;
}
