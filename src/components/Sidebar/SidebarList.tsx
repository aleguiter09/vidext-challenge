"use client";
import { trpc } from "@/providers/TRPCProvider";
import { Document } from "@/schemas/document";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import SidebarDialog from "./SidebarDialog";
import { toast } from "sonner";
import { usePathname } from "next/navigation";

type SidebarProps = Readonly<{
  initialDocs: Document[];
}>;

export function SidebarList({ initialDocs }: SidebarProps) {
  const pathname = usePathname();
  const currentId = pathname.startsWith("/editor/")
    ? pathname.split("/").pop()
    : null;

  const { data = [], isFetching } = trpc.getAll.useQuery(undefined, {
    initialData: initialDocs,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const utils = trpc.useUtils();
  const deleteMutation = trpc.deleteDocument.useMutation({
    onSuccess: () => {
      utils.getAll.invalidate();
      toast.success("Document deleted successfully");
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate({ id });
  };

  const renderList = () => {
    return data.length === 0 ? (
      <p className="text-muted-foreground text-sm text-center">
        No documents yet
      </p>
    ) : (
      <ul className="space-y-2">
        {data.map((doc) => {
          const isActive = doc.id === currentId;

          return (
            <li
              key={doc.id}
              className="flex items-center justify-between gap-2"
            >
              <Link
                href={`/editor/${doc.id}`}
                className={`block text-foreground flex-1 rounded-md px-3 py-2 text-sm transition ${
                  isActive ? "bg-vidext-500 font-medium" : "hover:bg-muted"
                }`}
              >
                {doc.title}
              </Link>
              <SidebarDialog handleDelete={() => handleDelete(doc.id)} />
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3">
      {isFetching ? (
        <div className="text-xs justify-center text-muted-foreground flex items-center gap-1">
          <Loader2 className="h-5 w-5 animate-spin" /> Refreshing…
        </div>
      ) : (
        renderList()
      )}
    </div>
  );
}
