import { Button as ButtonAntd } from "antd";
import "./index.scss";

type TButton = {
  text: string;
  className?: string;
  onClick: () => void;
};

export const Button = ({ text, className, onClick }: TButton) => (
  <ButtonAntd type="text" onClick={onClick} className={className} size="small">
    {text}
  </ButtonAntd>
);
