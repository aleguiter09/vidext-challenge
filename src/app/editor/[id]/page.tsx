import { EditorClient } from "@/components/EditorClient";

export default async function EditorPage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  const { id } = await params;
  const parsedId = parseInt(id ?? "0", 10);

  return <EditorClient id={parsedId} />;
}
