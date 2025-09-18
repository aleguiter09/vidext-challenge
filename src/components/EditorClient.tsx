"use client";

import "tldraw/tldraw.css";
import { Document } from "@/schemas/document";
import { Tldraw } from "tldraw";
import { Toolbar } from "./Toolbar";

export function EditorClient({
  data,
}: Readonly<{ data?: Pick<Document, "id" | "snapshot"> }>) {
  return (
    <div className="w-screen h-screen relative">
      <Tldraw snapshot={data?.snapshot}>
        <Toolbar id={data?.id ?? "0"} />
      </Tldraw>
    </div>
  );
}
