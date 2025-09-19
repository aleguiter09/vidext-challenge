import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import EditorPage from "@/app/editor/[id]/page";
import { serverClient } from "@/server/serverClient";

vi.mock("@/server/serverClient", () => ({
  serverClient: {
    getDocument: vi.fn().mockResolvedValue({
      id: "123",
      title: "Test Doc",
      snapshot: { mock: "snapshot" },
    }),
  },
}));

vi.mock("@/components/Canva", () => ({
  //eslint-disable-next-line
  Canva: ({ id, snapshot, title }: any) => (
    <div>
      Mock Canva - id: {id}, title: {title}, snapshot:{" "}
      {snapshot?.mock || "none"}
    </div>
  ),
}));

describe("EditorPage [id]", () => {
  it("renders Canva with document data", async () => {
    render(
      await EditorPage({
        params: { id: "123" },
      })
    );

    expect(serverClient.getDocument).toHaveBeenCalledWith({ id: "123" });

    expect(
      screen.getByText(
        /Mock Canva - id: 123, title: Test Doc, snapshot: snapshot/
      )
    ).toBeInTheDocument();
  });
});
