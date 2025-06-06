import { create, type StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import type { TInitialState, TTodoState } from "./task.model";

const initialState: TInitialState = {
  todos: [],
  filter: "all",
};

export const todoStore: StateCreator<TTodoState> = (set, get) => ({
  ...initialState,
  addTodo: (todoText) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          text: todoText,
          id: uuidv4(),
          completed: false,
        },
      ],
    })),
  deleteCompletedTodos: () =>
    set((state) => ({
      todos: state.todos.filter((todo) => !todo.completed),
    })),
  completeTodo: (todoId) =>
    set((state) => ({
      todos: state.todos.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    })),
  setFilter: (filter) => set({ filter }),
  filteredTodos: () => {
    const { todos, filter } = get();
    switch (filter) {
      case "completed":
        return todos.filter((todo) => todo.completed);
      case "active":
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  },
});

export const useTodoStore = create<TTodoState>()(
  persist(todoStore, {
    name: "todo-storage",
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({ todos: state.todos }),
  })
);
