import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Result from './Result';

describe("<Result />", () => {
  test("render result", () => {
    render(<Result />);
    const inputEl = screen.getByTestId("result-box");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "text");
    expect(inputEl).toBeDisabled();
  });
});
