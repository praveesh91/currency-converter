import { Input } from 'antd';
import React from 'react';

const Inputbox = (props) => {
  return (
    <Input
      type="number"
      data-testid="number-input"
      value={props.amountVal}
      onChange={props.handleInput}
    />
  );
};

export default Inputbox;
