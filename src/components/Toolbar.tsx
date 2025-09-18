"use client";

import { trpc } from "@/providers/TRPCProvider";
import { useState } from "react";
import { getSnapshot, useEditor } from "tldraw";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { TitleSchema } from "@/schemas/document";

export function Toolbar({
  id,
  initialTitle,
}: Readonly<{ id: string; initialTitle: string }>) {
  const [title, setTitle] = useState(initialTitle);
  const [error, setError] = useState<string | undefined>();
  const utils = trpc.useUtils();
  const editor = useEditor();
  const saveMutation = trpc.saveDocument.useMutation({
    onSuccess: () => {
      utils.getAll.invalidate();
      toast.success("Changes saved successfully");
    },
    onError: () => toast.error("Failed to save changes"),
  });

  const handleSave = () => {
    const parsed = TitleSchema.safeParse(title);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    setError(undefined);

    if (!editor) return;

    const snapshot = getSnapshot(editor.store);
    saveMutation.mutate({ id, snapshot, title });
  };

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 bg-white/80 backdrop-blur-sm shadow-md rounded-xl px-4 py-2 z-50">
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={error}
      />
      <Button
        onClick={handleSave}
        className="px-3 py-1 rounded bg-vidext-500 text-primary hover:bg-vidext-500/70 cursor-pointer"
      >
        Save
      </Button>
    </div>
  );
}
