import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CreateButton } from "@/components/CreateButton";

const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

vi.mock("uuid", () => ({
  v4: () => "mock-uuid-123",
}));

vi.mock("@/components/ui/button", () => ({
  //eslint-disable-next-line
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

describe("CreateButton", () => {
  it("renders the button", () => {
    render(<CreateButton />);
    expect(screen.getByText("Create new document")).toBeInTheDocument();
  });

  it("generates a uuid and navigates on click", () => {
    render(<CreateButton />);

    fireEvent.click(screen.getByText("Create new document"));

    expect(push).toHaveBeenCalledWith("/editor/mock-uuid-123");
  });
});
