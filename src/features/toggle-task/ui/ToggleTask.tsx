import type { TTodo } from "@/entities/task/model/task.model";
import { useTodoStore } from "@/entities/task/model/task.state";
import { Radio } from "@/shared/ui";

export const ToggleTask = ({ id, completed }: TTodo) => {
  const { completeTodo } = useTodoStore();

  return <Radio onClick={() => completeTodo(id)} checked={completed} />;
};
