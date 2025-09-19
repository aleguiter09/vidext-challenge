import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import EditorPage from "@/app/editor/[id]/page";

vi.mock("@/components/EditorClient", () => ({
  //eslint-disable-next-line
  EditorClient: ({ id }: any) => <div>Mock Canva - id: {id} </div>,
}));

describe("EditorPage [id]", () => {
  it("renders Canva with document data", async () => {
    render(
      await EditorPage({
        params: { id: "123" },
      })
    );

    expect(screen.getByText(/Mock Canva - id: 123/)).toBeInTheDocument();
  });
});
