import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SidebarList } from "@/components/Sidebar/SidebarList";
import type { Document } from "@/schemas/document";

vi.mock("next/navigation", () => ({
  usePathname: () => "/editor/1",
}));

vi.mock("@/components/Sidebar/SidebarDialog", () => ({
  __esModule: true,
  default: ({ handleDelete }: { handleDelete: () => void }) => (
    <button onClick={handleDelete}>Delete</button>
  ),
}));

const toastSuccess = vi.fn();
vi.mock("sonner", () => ({
  toast: { success: (msg: string) => toastSuccess(msg) },
}));

const invalidate = vi.fn();
const mutate = vi.fn();
vi.mock("@/providers/TRPCProvider", () => ({
  trpc: {
    getAll: {
      useQuery: vi.fn().mockImplementation((_args, opts) => ({
        data: opts?.initialData ?? [],
        isFetching: false,
      })),
    },
    deleteDocument: {
      useMutation: vi.fn().mockImplementation((opts) => ({
        //eslint-disable-next-line
        mutate: (args: any) => {
          mutate(args);
          opts?.onSuccess?.();
        },
      })),
    },
    useUtils: () => ({
      getAll: { invalidate },
    }),
  },
}));

describe("SidebarList", () => {
  const mockDocs: Document[] = [
    { id: "1", title: "Doc 1", createdAt: new Date(), updatedAt: new Date() },
    { id: "2", title: "Doc 2", createdAt: new Date(), updatedAt: new Date() },
  ];

  it("renders documents with active highlighting", () => {
    render(<SidebarList initialDocs={mockDocs} />);
    expect(screen.getByText("Doc 1")).toHaveClass("bg-vidext-500");
    expect(screen.getByText("Doc 2")).toBeInTheDocument();
  });

  it("renders empty state if no documents", () => {
    render(<SidebarList initialDocs={[]} />);
    expect(screen.getByText("No documents yet")).toBeInTheDocument();
  });

  it("calls delete mutation and invalidates cache", () => {
    render(<SidebarList initialDocs={mockDocs} />);
    fireEvent.click(screen.getAllByText("Delete")[0]);

    expect(mutate).toHaveBeenCalledWith({ id: "1" });
    expect(invalidate).toHaveBeenCalled();
    expect(toastSuccess).toHaveBeenCalledWith("Document deleted successfully");
  });
});
