"use client";

import { trpc } from "@/providers/TRPCProvider";
import React from "react";
import { getSnapshot, useEditor } from "tldraw";

export function Toolbar({ id }: Readonly<{ id: string }>) {
  const editor = useEditor();
  const saveMutation = trpc.saveDocument.useMutation();

  const handleSave = () => {
    if (!editor) return;
    const snapshot = getSnapshot(editor.store);
    saveMutation.mutate({ id, snapshot });
  };

  const handlePaintRed = () => {
    if (!editor) return;
    const selected = editor.getSelectedShapeIds();
    if (selected.length === 0) return;

    editor.updateShapes(
      selected.map((id) => ({
        id,
        type: "shape",
        props: { color: "red" },
      }))
    );
  };

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 bg-white/80 backdrop-blur-sm shadow-md rounded-xl px-4 py-2 z-50">
      <button
        onClick={handleSave}
        className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
      >
        💾 Guardar
      </button>
      <button
        onClick={handlePaintRed}
        className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
      >
        🎨 Pintar rojo
      </button>
    </div>
  );
}
