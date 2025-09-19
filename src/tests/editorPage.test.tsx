import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import EditorPage from "@/app/editor/page";

vi.mock("uuid", () => ({
  v4: () => "mock-uuid-123",
}));

vi.mock("@/components/Canva", () => ({
  //eslint-disable-next-line
  Canva: ({ id }: any) => <div>Mock Canva with id: {id}</div>,
}));

describe("EditorPage", () => {
  it("renders Canva with a generated uuid", async () => {
    render(await EditorPage());

    expect(
      screen.getByText("Mock Canva with id: mock-uuid-123")
    ).toBeInTheDocument();
  });
});
