import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TodoListPage } from "@/pages/todo-list/TodoList.tsx";
import "@/app/styles/index.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TodoListPage />
  </StrictMode>
);
