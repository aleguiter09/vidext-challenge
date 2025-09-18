import { Canva } from "@/components/Canva";
import { v4 as uuid } from "uuid";

export default async function EditorPage() {
  const newId = uuid();

  return <Canva id={newId} />;
}
