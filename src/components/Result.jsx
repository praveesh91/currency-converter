import { Input } from 'antd';
import React from 'react';

const Result = (props) => {
  return (
    <Input
      data-testid="result-box"
      type="text"
      disabled={true}
      value={props.finalRes}
    />
  );
};

export default Result;
