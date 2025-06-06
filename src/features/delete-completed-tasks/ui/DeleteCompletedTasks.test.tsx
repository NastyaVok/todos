import { useTodoStore } from "@/entities/task/model/task.state";
import { DeleteCompletedTasks } from "./DeleteCompletedTasks";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/entities/task/model/task.state", () => ({
  useTodoStore: vi.fn(() => ({
    deleteCompletedTodos: vi.fn(),
  })),
}));

describe("DeleteCompletedTasks", () => {
  it("should call onClick when button is clicked", async () => {
    const mockDeleteCompletedTodos = vi.fn();
    vi.mocked(useTodoStore).mockReturnValue({
      deleteCompletedTodos: mockDeleteCompletedTodos,
    });

    const user = userEvent.setup();

    render(<DeleteCompletedTasks />);

    const button = screen.getByRole("button");

    await user.click(button);
    expect(mockDeleteCompletedTodos).toHaveBeenCalled();
  });
});
