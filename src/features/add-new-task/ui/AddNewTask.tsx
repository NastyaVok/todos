import { useState, type ChangeEvent } from "react";
import { useTodoStore } from "@/entities/task/model/task.state";
import { Input } from "@/shared/ui";

export const AddNewTask = () => {
  const { addTodo } = useTodoStore();
  const [newTodo, setNewTodo] = useState<string>("");

  const handleAddTodo = () => {
    if (!newTodo || !newTodo?.trim()) return;

    addTodo(newTodo);
    setNewTodo("");
  };
  return (
    <Input
      placeholder={"What needs to be done?"}
      onPressEnter={handleAddTodo}
      value={newTodo}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        setNewTodo(e.target.value)
      }
    />
  );
};
