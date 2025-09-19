import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import RootLayout from "@/app/layout";
import { serverClient } from "@/server/serverClient";

vi.mock("next/font/google", () => ({
  Geist: () => ({ variable: "font-geist-sans" }),
  Geist_Mono: () => ({ variable: "font-geist-mono" }),
}));

vi.mock("@/server/serverClient", () => ({
  serverClient: {
    getAll: vi.fn().mockResolvedValue([
      //eslint-disable-next-line
      { id: "1", title: "Doc 1", snapshot: {} as any },
    ]),
  },
}));

vi.mock("@/components/Sidebar/Sidebar", () => ({
  //eslint-disable-next-line
  Sidebar: ({ initialDocs }: any) => (
    <aside>
      <p>Mock Sidebar</p>
      {initialDocs.map(
        (
          //eslint-disable-next-line
          doc: any
        ) => (
          <span key={doc.id}>{doc.title}</span>
        )
      )}
    </aside>
  ),
}));

vi.mock("@/providers/TRPCProvider", () => ({
  //eslint-disable-next-line
  TRPCProvider: ({ children }: any) => <div>{children}</div>,
}));

vi.mock("@/components/ui/sonner", () => ({
  Toaster: () => <div>Mock Toaster</div>,
}));

describe("RootLayout", () => {
  it("renders children and sidebar with docs", async () => {
    render(
      await RootLayout({
        children: <div>Test Child</div>,
      })
    );

    expect(serverClient.getAll).toHaveBeenCalled();

    expect(screen.getByText("Mock Sidebar")).toBeInTheDocument();
    expect(screen.getByText("Doc 1")).toBeInTheDocument();

    expect(screen.getByText("Test Child")).toBeInTheDocument();

    expect(screen.getByText("Mock Toaster")).toBeInTheDocument();
  });
});
