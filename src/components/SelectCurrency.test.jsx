import { fireEvent, render, screen } from '@testing-library/react';

import SelectCurrency from './SelectCurrency';

describe("<SelectCurrency />", () => {
  test("render select boxes", () => {
    const { queryAllByTestId } = render(<SelectCurrency />);
    const selectItem = queryAllByTestId("select");
    expect(selectItem).toBeTruthy();
  });
});
