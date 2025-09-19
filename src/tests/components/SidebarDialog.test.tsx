import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SidebarDialog from "@/components/Sidebar/SidebarDialog";

describe("SidebarDialog", () => {
  it("opens the dialog when trigger is clicked", () => {
    const handleDelete = vi.fn();
    render(<SidebarDialog handleDelete={handleDelete} />);

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByText("Delete this document?")).toBeInTheDocument();
    expect(
      screen.getByText(
        "This action cannot be undone. The document will be permanently deleted."
      )
    ).toBeInTheDocument();
  });

  it("calls handleDelete when clicking Delete", () => {
    const handleDelete = vi.fn();
    render(<SidebarDialog handleDelete={handleDelete} />);

    fireEvent.click(screen.getByRole("button"));

    fireEvent.click(screen.getByText("Delete"));

    expect(handleDelete).toHaveBeenCalledTimes(1);
  });

  it("does not call handleDelete when clicking Close", () => {
    const handleDelete = vi.fn();
    render(<SidebarDialog handleDelete={handleDelete} />);

    fireEvent.click(screen.getByRole("button"));

    fireEvent.click(screen.getByText("Close"));

    expect(handleDelete).not.toHaveBeenCalled();
  });
});
