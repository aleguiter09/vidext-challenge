"use client";

import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";
import { Button } from "./ui/button";

export function CreateButton() {
  const router = useRouter();

  const handleCreate = () => {
    const newId = uuid();
    router.push(`/editor/${newId}`);
  };

  return (
    <Button
      onClick={handleCreate}
      className="px-4 py-2 bg-vidext-500 text-primary rounded-lg shadow hover:bg-vidext-500/70 cursor-pointer"
    >
      Create new document
    </Button>
  );
}
