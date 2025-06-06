import { CollapseTasks } from "./CollapseTasks";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

describe("CollapseTasks", () => {
  it("should call onClick when button is clicked", async () => {
    const mockOnClick = vi.fn();
    render(<CollapseTasks open={false} onClick={mockOnClick} />);

    await userEvent.click(screen.getByRole("button"));
    expect(mockOnClick).toHaveBeenCalled();
  });
});
