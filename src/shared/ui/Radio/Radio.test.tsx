import { Radio } from "./Radio";
import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

describe("Radio", () => {
  it("should call onClick when button is clicked", () => {
    const handleClick = vi.fn();

    render(<Radio onClick={handleClick} />);

    fireEvent.click(screen.getByRole("radio"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  it("should call onClick when button is clicked in controlled component", () => {
    const TestRadio = () => {
      const [checked, setChecked] = useState(false);
      return <Radio checked={checked} onClick={() => setChecked(!checked)} />;
    };

    render(<TestRadio />);

    const radioInput = screen.getByRole("radio");
    const radioWrapper = radioInput.closest(".ant-radio");

    expect(radioWrapper).not.toHaveClass("ant-radio-checked");

    fireEvent.click(radioInput);

    expect(radioWrapper).toHaveClass("ant-radio-checked");
  });
});
