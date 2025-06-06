export type TTodo = {
  id: string;
  text: string;
  completed: boolean;
};

export type TFilter = "all" | "completed" | "active";

export type TInitialState = {
  todos: TTodo[];
  filter: TFilter;
};

type TActions = {
  setFilter: (filter: TFilter) => void;
  filteredTodos: () => TTodo[];
  addTodo: (text: string) => void;
  completeTodo: (todoId: string) => void;
  deleteCompletedTodos: () => void;
};

export type TTodoState = TInitialState & TActions;
