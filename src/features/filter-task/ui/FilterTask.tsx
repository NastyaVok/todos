import { Button } from "@/shared/ui";
import { useTodoStore } from "@/entities/task/model/task.state";
import { Space } from "antd";
import type { TFilter } from "@/entities/task/model/task.model";

import styles from "./FilterTask.module.scss";

type TButton = { id: number; text: string; value: TFilter };

const FILTER_BUTTONS: TButton[] = [
  { id: 0, text: "All", value: "all" },
  { id: 1, text: "Active", value: "active" },
  { id: 2, text: "Completed", value: "completed" },
];

export const FilterTask = () => {
  const { setFilter, filter } = useTodoStore();

  return (
    <Space>
      {FILTER_BUTTONS.map(({ id, text, value }) => (
        <Button
          key={id}
          text={text}
          onClick={() => setFilter(value)}
          className={filter === value ? styles.active : ""}
        />
      ))}
    </Space>
  );
};
