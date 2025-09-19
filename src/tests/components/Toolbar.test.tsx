import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Toolbar } from "@/components/Toolbar";
import { getDocument } from "@/server/fileStore";

const mockEditor = { store: {} };

vi.mock("tldraw", () => ({
  useEditor: () => mockEditor,
  getSnapshot: vi.fn().mockReturnValue({ mock: "snapshot" }),
}));

const toastSuccess = vi.fn();
const toastError = vi.fn();

vi.mock("sonner", () => ({
  toast: {
    success: (msg: string) => toastSuccess(msg),
    error: (msg: string) => toastError(msg),
  },
}));

const mutateSave = vi.fn();
const mutateSuggest = vi.fn();
const invalidate = vi.fn();

vi.mock("@/providers/TRPCProvider", () => ({
  trpc: {
    useUtils: () => ({
      getAll: { invalidate },
      getDocument: { invalidate },
    }),
    saveDocument: {
      useMutation: vi.fn().mockImplementation((opts) => ({
        //eslint-disable-next-line
        mutate: (args: any) => {
          mutateSave(args);
          opts?.onSuccess?.();
        },
      })),
    },
    suggestTitle: {
      useMutation: vi.fn().mockImplementation((opts) => ({
        //eslint-disable-next-line
        mutate: (args: any) => {
          mutateSuggest(args);
          opts?.onSuccess?.({ title: "AI Title" });
        },
        isPending: false,
      })),
    },
  },
}));

describe("Toolbar", () => {
  it("renders with initial title", () => {
    render(<Toolbar id="1" initialTitle="Initial Doc" />);
    expect(screen.getByDisplayValue("Initial Doc")).toBeInTheDocument();
  });

  it("shows error if title is invalid", () => {
    render(<Toolbar id="1" initialTitle="" />);
    fireEvent.click(screen.getByText("Save"));
    expect(toastSuccess).not.toHaveBeenCalled();
    expect(mutateSave).not.toHaveBeenCalled();
  });

  it("saves document if title is valid", () => {
    render(<Toolbar id="1" initialTitle="Valid Title" />);
    fireEvent.click(screen.getByText("Save"));
    expect(mutateSave).toHaveBeenCalledWith({
      id: "1",
      snapshot: { mock: "snapshot" },
      title: "Valid Title",
    });
    expect(invalidate).toHaveBeenCalled();
    expect(toastSuccess).toHaveBeenCalledWith("Changes saved successfully");
  });

  it("suggests a title via AI", () => {
    render(<Toolbar id="1" initialTitle="Untitled" />);
    fireEvent.click(screen.getByText("✨ Suggest Title"));
    expect(mutateSuggest).toHaveBeenCalled();
    expect(toastSuccess).toHaveBeenCalledWith("AI suggested: AI Title");
    expect(screen.getByDisplayValue("AI Title")).toBeInTheDocument();
  });
});
