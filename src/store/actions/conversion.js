import * as actionTypes from './actionTypes';

export const inputCurrencyVal = (value) => {
  console.log(value);
  return {
    type: actionTypes.INPUT_CURRENCY_VALUE,
    payload: value,
  };
};

export const changeBase = (value) => {
  return {
    type: actionTypes.CHANGE_BASE_CURRENCY,
    payload: value,
  };
};

export const changeTerms = (value) => {
  console.log(value);
  return {
    type: actionTypes.CHANGE_TERMS_CURRENCY,
    payload: value,
  };
};

export const convert = () => {
  return {
    type: actionTypes.CONVERT_CURRENCY,
  };
};
