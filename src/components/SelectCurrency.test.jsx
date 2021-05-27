import { fireEvent, render, screen } from '@testing-library/react';

import SelectCurrency from './SelectCurrency';

describe("<SelectCurrency />", () => {
  test("render select boxes", () => {
    render(<SelectCurrency />);
  });
});
