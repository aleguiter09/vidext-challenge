import { EditorClient } from "@/components/EditorClient";

export default async function EditorPage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  const { id } = await params;
  return <EditorClient id={id} />;
}
