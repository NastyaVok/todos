import { Radio as RadioAntd } from "antd";

type TRadio = {
  checked?: boolean;
  onClick?: () => void;
  title?: string;
  className?: string;
};

export const Radio = ({ checked, title, onClick }: TRadio) => (
  <RadioAntd checked={checked} onClick={onClick}>
    {title}
  </RadioAntd>
);
