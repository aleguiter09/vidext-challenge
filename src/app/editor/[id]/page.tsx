import { EditorClient } from "@/components/EditorClient";
import { serverClient } from "@/server/serverClient";

export default async function EditorPage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  const { id } = await params;
  const data = await serverClient.getDocument({ id });

  return <EditorClient data={data} />;
}
