import { useTodoStore } from "@/entities/task/model/task.state";
import { FilterTask } from "./FilterTask";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/entities/task/model/task.state", () => ({
  useTodoStore: vi.fn(() => ({
    setFilter: vi.fn(),
  })),
}));

describe("FilterTask", () => {
  it("should call setFilter when button clicked", async () => {
    const mockSetFilter = vi.fn();
    vi.mocked(useTodoStore).mockReturnValue({
      setFilter: mockSetFilter,
    });
    render(<FilterTask />);
    const user = userEvent.setup();

    await user.click(screen.getByText("Completed"));
    expect(mockSetFilter).toHaveBeenCalledWith("completed");
  });
});
