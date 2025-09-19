import { EditorClient } from "@/components/EditorClient";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("@/components/Canva", () => ({
  //eslint-disable-next-line
  Canva: ({ id, title }: any) => (
    <div data-testid="mock-canva">
      Canva Mock – {id} – {title}
    </div>
  ),
}));

const mockUseQuery = vi.fn();
vi.mock("@/providers/TRPCProvider", () => ({
  trpc: {
    getDocument: {
      //eslint-disable-next-line
      useQuery: (args: any) => mockUseQuery(args),
    },
  },
}));

describe("ClientEditor", () => {
  it("muestra Canva con los datos cuando la query devuelve data", () => {
    mockUseQuery.mockReturnValue({
      data: { id: "123", title: "My Doc", snapshot: { foo: "bar" } },
      isLoading: false,
    });

    render(<EditorClient id="123" />);

    expect(screen.getByTestId("mock-canva")).toHaveTextContent(
      "Canva Mock – 123 – My Doc"
    );
  });
});
