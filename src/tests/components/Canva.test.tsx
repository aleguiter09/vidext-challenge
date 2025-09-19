import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Canva } from "@/components/Canva";

vi.mock("@/components/Toolbar", () => ({
  //eslint-disable-next-line
  Toolbar: ({ id, initialTitle }: any) => (
    <div>
      Mock Toolbar - id: {id}, title: {initialTitle}
    </div>
  ),
}));

vi.mock("tldraw", () => ({
  //eslint-disable-next-line
  Tldraw: ({ snapshot, children }: any) => (
    <div data-testid="tldraw">
      Mock Tldraw - {snapshot ? "with snapshot" : "no snapshot"}
      {children}
    </div>
  ),
}));

describe("Canva", () => {
  it("renders with snapshot and title", () => {
    render(
      //eslint-disable-next-line
      <Canva id="123" title="My Doc" snapshot={{ mock: "data" } as any} />
    );

    expect(screen.getByTestId("tldraw")).toHaveTextContent("with snapshot");
    expect(screen.getByText(/Mock Toolbar/)).toHaveTextContent("id: 123");
    expect(screen.getByText(/Mock Toolbar/)).toHaveTextContent("title: My Doc");
  });

  it("renders without snapshot and default title", () => {
    render(<Canva id="456" />);

    expect(screen.getByTestId("tldraw")).toHaveTextContent("no snapshot");
    expect(screen.getByText(/Mock Toolbar/)).toHaveTextContent("id: 456");
    expect(screen.getByText(/Mock Toolbar/)).toHaveTextContent("title:");
  });
});
