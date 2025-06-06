import { Button } from "./Button";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("Button", () => {
  it("should call onClick once when button is clicked", () => {
    const handleClick = vi.fn();

    render(<Button text={"Button"} onClick={handleClick} />);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
