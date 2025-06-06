import styles from "./CollapseTasks.module.scss";

type TCollapseTasks = {
  open: boolean;
  onClick: () => void;
};

export const CollapseTasks = ({ open, onClick }: TCollapseTasks) => {
  return (
    <button
      className={`${styles.arrow} ${open ? styles.open : ""}`}
      onClick={onClick}
    ></button>
  );
};
