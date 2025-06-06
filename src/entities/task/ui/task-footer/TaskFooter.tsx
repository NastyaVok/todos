import type { ReactNode } from "react";
import styles from "./TaskFooter.module.scss";
import { useTodoStore } from "../../model/task.state";

type TTaskFooter = {
  children: ReactNode;
};

export const TaskFooter = ({ children }: TTaskFooter) => {
  const { filteredTodos } = useTodoStore();
  const activeItemsCount = filteredTodos().length;
  const suffix = activeItemsCount !== 1 ? "s" : "";

  const activeItemsTitle = `${activeItemsCount} item${suffix} left`;

  return (
    <div className={styles.footer}>
      <span>{activeItemsTitle}</span>
      {children}
    </div>
  );
};
