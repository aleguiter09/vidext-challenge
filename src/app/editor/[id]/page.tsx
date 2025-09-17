import { EditorClient } from "@/components/EditorClient";
import { serverClient } from "@/server/serverClient";

export default async function EditorPage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  const { id } = await params;
  const parsedId = parseInt(id ?? "0", 10);

  const data = await serverClient.getDocument({ id: parsedId });

  if (!data.snapshot) {
    return <div className="p-4 text-red-500">Document not found</div>;
  }

  return <EditorClient data={data} />;
}
