import { Canva } from "@/components/Canva";
import { serverClient } from "@/server/serverClient";

export default async function EditorPage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  const { id } = await params;
  const data = await serverClient.getDocument({ id });

  return <Canva id={id} snapshot={data.snapshot} title={data.title} />;
}
