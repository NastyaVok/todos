import type { ReactNode } from "react";
import type { TTodo } from "../../model/task.model";
import styles from "./TaskRow.module.scss";

type TTaskRow = TTodo & { toggleEvent: ReactNode };

export const TaskRow = ({ id, completed, text, toggleEvent }: TTaskRow) => (
  <li key={id} className={styles.row}>
    {toggleEvent}
    <span className={completed ? styles.completed : ""}>{text}</span>
  </li>
);
