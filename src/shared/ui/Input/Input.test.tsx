import { Input } from "./Input";
import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

describe("Input", () => {
  it("should fill value", () => {
    const onChange = vi.fn();

    render(<Input value={""} onChange={onChange} />);

    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "input" } });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: "input" }),
      })
    );
  });
  it("should fill value in controlled component", () => {
    const TestInput = () => {
      const [value, setValue] = useState("");
      return <Input value={value} onChange={(e) => setValue(e.target.value)} />;
    };
    render(<TestInput />);
    const input = screen.getByRole("textbox") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "input" } });

    expect(input.value).toBe("input");
  });
});
