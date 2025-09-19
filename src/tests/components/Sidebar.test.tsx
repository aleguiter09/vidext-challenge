import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import type { Document } from "@/schemas/document";

vi.mock("next/link", () => {
  return {
    //eslint-disable-next-line
    default: ({ href, children }: any) => <a href={href}>{children}</a>,
  };
});

vi.mock("next/image", () => {
  return {
    __esModule: true, //eslint-disable-next-line
    default: (props: any) => {
      // eslint-disable-next-line @next/next/no-img-element
      return <img {...props} alt={props.alt} />;
    },
  };
});

vi.mock("@/components/CreateButton", () => ({
  CreateButton: () => <button>Create Doc</button>,
}));

vi.mock("@/components/Sidebar/SidebarList", () => ({
  SidebarList: ({ initialDocs }: { initialDocs: Document[] }) => (
    <ul>
      {initialDocs.map((doc) => (
        <li key={doc.id}>{doc.title}</li>
      ))}
    </ul>
  ),
}));

describe("Sidebar", () => {
  it("renders logo, document list and create button", () => {
    const mockDocs: Document[] = [
      { id: "1", title: "Doc 1", createdAt: new Date(), updatedAt: new Date() },
      { id: "2", title: "Doc 2", createdAt: new Date(), updatedAt: new Date() },
    ];

    render(<Sidebar initialDocs={mockDocs} />);

    expect(screen.getByAltText("Logo")).toBeInTheDocument();

    expect(screen.getByText("Doc 1")).toBeInTheDocument();
    expect(screen.getByText("Doc 2")).toBeInTheDocument();

    expect(screen.getByText("Create Doc")).toBeInTheDocument();
  });
});
