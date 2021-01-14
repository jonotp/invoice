import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import CustomDialog from "./custom-dialog.component";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  jest.restoreAllMocks();
});

const MockComponent = () => {
  const [counter, setCounter] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div>
      Counter is {counter}
      <button role="button" onClick={() => setIsDialogOpen(true)}>Increment Counter</button>
      <CustomDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={() => setCounter(counter + 1)}
      >
        <span>Would you like to increment counter?</span>
      </CustomDialog>
    </div>
  );
};

describe("Dialog unit tests", () => {
  it("Can handle submit and will increment counter", () => {
    render(
      <MockComponent/>
    );

    expect(screen.queryAllByRole("dialog").length).toEqual(0);
    expect(screen.getByText("Counter is 0")).toBeDefined();
    expect(screen.queryByText("Would you like to increment counter?")).toBeNull();
    userEvent.click(screen.getByRole("button",{name:/Increment Counter/i}));
    expect(screen.queryAllByRole("dialog").length).toBeGreaterThan(0);
    expect(screen.getByText("Would you like to increment counter?")).toBeDefined();
    userEvent.click(screen.getByRole("button",{name:/ok/i}));
    expect(screen.getByText("Counter is 1")).toBeDefined();
  });

  it("Can handle cancel and will not increment counter", () => {
    render(
      <MockComponent/>
    );

    expect(screen.queryAllByRole("dialog").length).toEqual(0);
    expect(screen.getByText("Counter is 0")).toBeDefined();
    expect(screen.queryByText("Would you like to increment counter?")).toBeNull();
    userEvent.click(screen.getByRole("button",{name:/Increment Counter/i}));
    expect(screen.queryAllByRole("dialog").length).toBeGreaterThan(0);
    expect(screen.getByText("Would you like to increment counter?")).toBeDefined();
    userEvent.click(screen.getByRole("button",{name:/cancel/i}));
    expect(screen.getByText("Counter is 0")).toBeDefined();
  });
});
