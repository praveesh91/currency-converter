import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Inputbox from './Inputbox';

describe("<Inputbox />", () => {
  test("render input number box", () => {
    const { queryByTestId } = render(<Inputbox />);
    const inputEl = queryByTestId("number-input");
    expect(inputEl).toBeTruthy();
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "number");
  });

  test("pass input value to inpput box", () => {
    const { queryByTestId } = render(<Inputbox />);
    const inputEl = queryByTestId("number-input");
    fireEvent.change(inputEl, { target: { value: "testValue" } });
    expect(inputEl).toBe("testValue");
  });
});
