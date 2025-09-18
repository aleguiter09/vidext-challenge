"use client";

import "tldraw/tldraw.css";
import { Tldraw, type TLEditorSnapshot } from "tldraw";
import { Toolbar } from "./Toolbar";

type CanvaProps = Readonly<{
  id: string;
  title?: string;
  snapshot?: TLEditorSnapshot;
}>;

export function Canva({ id, title, snapshot }: CanvaProps) {
  return (
    <div className="w-full h-full relative">
      <Tldraw snapshot={snapshot}>
        <Toolbar id={id} initialTitle={title ?? ""} />
      </Tldraw>
    </div>
  );
}
