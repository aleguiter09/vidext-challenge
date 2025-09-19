import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import HomePage from "@/app/page";

vi.mock("next/link", () => {
  return {
    //eslint-disable-next-line
    default: ({ href, children, ...props }: any) => (
      <a href={href} {...props}>
        {children}
      </a>
    ),
  };
});

vi.mock("@/components/CreateButton", () => ({
  CreateButton: () => <button>Create Doc</button>,
}));

describe("HomePage", () => {
  it("renders the heading with Vidext link", async () => {
    render(await HomePage());

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Welcome to the Vidext Challenge 👋");

    const link = screen.getByRole("link", { name: "Vidext" });
    expect(link).toHaveAttribute("href", "https://www.vidext.io/en");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("renders the description text", async () => {
    render(await HomePage());

    expect(
      screen.getByText(
        "Start by creating a new document or open one from the sidebar."
      )
    ).toBeInTheDocument();
  });

  it("renders the CreateButton", async () => {
    render(await HomePage());

    expect(screen.getByText("Create Doc")).toBeInTheDocument();
  });
});
