import { useTodoStore } from "@/entities/task/model/task.state";
import { Button } from "@/shared/ui";

export const DeleteCompletedTasks = () => {
  const { deleteCompletedTodos } = useTodoStore();

  return <Button text={"Clear completed"} onClick={deleteCompletedTodos} />;
};
