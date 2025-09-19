import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import NotFound from "@/app/not-found";

vi.mock("next/link", () => {
  return {
    //eslint-disable-next-line
    default: ({ href, children }: any) => <a href={href}>{children}</a>,
  };
});

vi.mock("@/components/ui/button", () => ({
  //eslint-disable-next-line
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

describe("NotFound", () => {
  it("renders the 404 title and message", () => {
    render(<NotFound />);

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(
      screen.getByText("Oops! The page you are looking for doesn’t exist.")
    ).toBeInTheDocument();
  });

  it("renders a link to go home", () => {
    render(<NotFound />);

    const link = screen.getByRole("link", { name: "Go Home" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
