import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Inputbox from './Inputbox';

describe("<Inputbox />", () => {
  test("render input number", () => {
    render(<Inputbox />);
    const inputEl = screen.getByTestId("number-input");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "number");
  });
  test("pass invalid input value", () => {
    render(<Inputbox />);

    const inputEl = screen.getByTestId("number-input");
    userEvent.type(inputEl, "test");

    // expect(screen.getByTestId("number-input")).toHaveValue(10);
  });
});
