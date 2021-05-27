import { Input } from 'antd';
import React from 'react';

const Inputbox = (props) => {
  return (
    <Input
      type="number"
      placeholder="Enter the amount"
      data-testid="number-input"
      value={props.amountVal}
      onChange={props.handleInput}
    />
  );
};

export default Inputbox;
