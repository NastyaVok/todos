import { Input as InputAntd } from "antd";
import type { ChangeEvent } from "react";

type TInput = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPressEnter?: () => void;
  placeholder?: string;
};

export const Input = ({
  value,
  onChange,
  placeholder,
  onPressEnter,
}: TInput) => (
  <InputAntd
    onPressEnter={onPressEnter}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    variant="borderless"
  />
);
