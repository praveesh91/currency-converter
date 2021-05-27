import { Select } from 'antd';
import React from 'react';

const { Option } = Select;
const currencies = [
  "AUD",
  "CAD",
  "CNY",
  "CZK",
  "DKK",
  "EUR",
  "GBP",
  "JPY",
  "NOK",
  "NZD",
  "USD",
];
const SelectCurrency = (props) => {
  return (
    <Select
      placeholder="Select"
      data-testid="select-option"
      onChange={(e) => props.handleSelectCurrency(e)}>
      {currencies.map((e) => (
        <Option data-testid="select-option" key={e} value={e}>
          {e}
        </Option>
      ))}
    </Select>
  );
};

export default SelectCurrency;
