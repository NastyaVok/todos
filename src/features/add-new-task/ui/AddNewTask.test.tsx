import { useTodoStore } from "@/entities/task/model/task.state";
import { AddNewTask } from "./AddNewTask";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/entities/task/model/task.state", () => ({
  useTodoStore: vi.fn(() => ({
    addTodo: vi.fn(),
  })),
}));

describe("AddNewTask", () => {
  it("should fill value", async () => {
    const user = userEvent.setup();

    render(<AddNewTask />);

    const input = screen.getByRole("textbox") as HTMLInputElement;

    await user.type(input, "task 1");

    expect(input.value).toBe("task 1");
  });
  it("should add task in storage", async () => {
    const mockAddTodo = vi.fn();
    vi.mocked(useTodoStore).mockReturnValue({
      addTodo: mockAddTodo,
    });

    const user = userEvent.setup();

    render(<AddNewTask />);

    const input = screen.getByRole("textbox") as HTMLInputElement;

    await user.type(input, "task 1{enter}");
    expect(mockAddTodo).toHaveBeenCalledWith("task 1");
  });
  it("shoudn`t add empty task in storage", async () => {
    const mockAddTodo = vi.fn();
    vi.mocked(useTodoStore).mockReturnValue({
      addTodo: mockAddTodo,
    });

    const user = userEvent.setup();

    render(<AddNewTask />);

    const input = screen.getByRole("textbox");
    await user.type(input, "   {enter}");

    expect(mockAddTodo).not.toHaveBeenCalled();
  });
});
