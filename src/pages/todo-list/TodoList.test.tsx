import { TodoListPage } from "./TodoList";
import { v4 as uuidv4 } from "uuid";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const MOCK_TODO_ITEMS = [
  { id: uuidv4(), text: "Todo 1", completed: false },
  { id: uuidv4(), text: "Todo 2", completed: true },
  { id: uuidv4(), text: "Todo 3", completed: true },
];

const mockTodoStore = {
  todos: [...MOCK_TODO_ITEMS],
  filter: "all",
  setFilter: vi.fn((filter) => (mockTodoStore.filter = filter)),
  addTodo: vi.fn((text) => {
    mockTodoStore.todos.push({ id: uuidv4(), text, completed: false });
  }),
  deleteCompletedTodos: vi.fn(() => {
    mockTodoStore.todos = mockTodoStore.todos.filter((todo) => !todo.completed);
  }),
  completeTodo: vi.fn(),
  filteredTodos: () => {
    if (mockTodoStore.filter === "active")
      return mockTodoStore.todos.filter((todo) => !todo.completed);
    if (mockTodoStore.filter === "completed")
      return mockTodoStore.todos.filter((todo) => todo.completed);
    return mockTodoStore.todos;
  },
};

const setupMocks = () => {
  vi.mock("@feature/collapse-tasks/ui/CollapseTasks.module.scss", () => ({
    arrow: "arrow-class",
  }));

  vi.mock("./TodoList.module.scss", () => ({
    default: {
      container: "container-class",
      title: "title-class",
      todos: "todos-class",
      input: "input-class",
      todosWrapper: "todosWrapper-class",
      todosList: "todosList-class",
    },
  }));

  vi.mock("@/entities/task/model/task.state", () => ({
    useTodoStore: vi.fn(() => mockTodoStore),
  }));
};

describe("TodoListPage", () => {
  beforeEach(() => {
    mockTodoStore.todos = [...MOCK_TODO_ITEMS];
    mockTodoStore.filter = "all";
    vi.clearAllMocks();
    setupMocks();
  });

  const renderComponent = () => {
    const utils = render(<TodoListPage />);
    return {
      ...utils,
      getInput: () => screen.getByRole("textbox") as HTMLInputElement,
      getClearButton: () => screen.getByText("Clear completed"),
      getActiveFilter: () => screen.getByText("Active"),
      getTodoItems: () => screen.getAllByRole("listitem"),
    };
  };

  it("should add new Todo", async () => {
    const user = userEvent.setup();
    const { getInput, rerender } = renderComponent();

    await user.type(getInput(), "Todo 4{enter}");
    expect(mockTodoStore.addTodo).toHaveBeenCalledWith("Todo 4");

    rerender(<TodoListPage />);
    expect(screen.getByText("Todo 4")).toBeInTheDocument();
  });

  it("should delete completed Todos", async () => {
    const user = userEvent.setup();
    const { getClearButton, rerender } = renderComponent();

    expect(screen.getByText("Todo 2")).toBeInTheDocument();
    expect(screen.getByText("Todo 3")).toBeInTheDocument();

    await user.click(getClearButton());
    expect(mockTodoStore.deleteCompletedTodos).toHaveBeenCalled();

    rerender(<TodoListPage />);
    expect(screen.queryByText("Todo 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Todo 3")).not.toBeInTheDocument();
  });

  it("should filter Active todos", async () => {
    const user = userEvent.setup();
    const { getActiveFilter, rerender } = renderComponent();

    expect(screen.getByText("Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Todo 2")).toBeInTheDocument();
    expect(screen.getByText("Todo 3")).toBeInTheDocument();

    await user.click(getActiveFilter());
    expect(mockTodoStore.setFilter).toHaveBeenCalledWith("active");

    rerender(<TodoListPage />);
    expect(screen.getByText("Todo 1")).toBeInTheDocument();
    expect(screen.queryByText("Todo 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Todo 3")).not.toBeInTheDocument();
  });

  it("should collapse todos", async () => {
    const user = userEvent.setup();
    const { container, rerender } = renderComponent();

    const todosWrapper = container.querySelector(".todosWrapper-class");
    const buttonCollapse = container.querySelector(".arrow-class");

    expect(todosWrapper).toBeInTheDocument();

    if (buttonCollapse) {
      await user.click(buttonCollapse);
      rerender(<TodoListPage />);
      expect(todosWrapper).not.toBeInTheDocument();
    }
  });
});
