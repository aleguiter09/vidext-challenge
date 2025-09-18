import Link from "next/link";
import { serverClient } from "@/server/serverClient";

export default async function HomePage() {
  const documents = await serverClient.getAll();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Mis documentos</h1>
      <ul className="space-y-2">
        {documents.map((doc) => (
          <li key={doc.id}>
            <Link
              href={`/editor/${doc.id}`}
              className="text-blue-600 hover:underline"
            >
              {doc.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
