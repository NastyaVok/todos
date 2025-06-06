import { useState } from "react";
import styles from "./TodoList.module.scss";
import { useTodoStore } from "@/entities/task/model/task.state";
import { TaskFooter, TaskRow } from "@/entities/task";
import {
  DeleteCompletedTasks,
  ToggleTask,
  FilterTask,
  CollapseTasks,
  AddNewTask,
} from "@/features";

export const TodoListPage = () => {
  const { filteredTodos } = useTodoStore();
  const [showTodos, setShowTodos] = useState(true);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>todos</h2>
      <div className={styles.todos}>
        <div className={styles.input}>
          <CollapseTasks
            open={showTodos}
            onClick={() => setShowTodos(!showTodos)}
          />
          <AddNewTask />
        </div>
        {showTodos && (
          <div className={styles.todosWrapper}>
            <ul className={styles.todosList}>
              {filteredTodos().map((todo) => {
                return (
                  <TaskRow
                    key={todo.id}
                    {...todo}
                    toggleEvent={<ToggleTask {...todo} />}
                  />
                );
              })}
            </ul>
            <TaskFooter>
              <FilterTask />
              <DeleteCompletedTasks />
            </TaskFooter>
          </div>
        )}
      </div>
    </div>
  );
};
