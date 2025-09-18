import Image from "next/image";
import Link from "next/link";
import { Document } from "@/schemas/document";
import { CreateButton } from "../CreateButton";
import { SidebarList } from "./SidebarList";

type SidebarProps = Readonly<{
  initialDocs: Document[];
}>;

export function Sidebar({ initialDocs }: SidebarProps) {
  return (
    <aside className="flex flex-col h-screen w-64 border-r bg-background">
      <div className="p-4 flex items-center justify-center border-b">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={120} height={40} priority />
        </Link>
      </div>

      <SidebarList initialDocs={initialDocs} />

      <div className="p-4 flex items-center justify-center border-t">
        <CreateButton />
      </div>
    </aside>
  );
}
