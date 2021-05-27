import * as actionTypes from '../actions/actionTypes';

const initialValues = {
  base: "",
  terms: "",
  amount: 0,
  result: "",
  intermediateCrossresult: "",
  finalCrossresult: "",
  errorFlag: "",
};

const reducer = (state = initialValues, action) => {
  console.log({ action });
  switch (action.type) {
    case actionTypes.CHANGE_BASE_CURRENCY: {
      return {
        ...state,
        base: action.payload,
      };
    }
    case actionTypes.CHANGE_TERMS_CURRENCY: {
      return {
        ...state,
        terms: action.payload,
      };
    }
    case actionTypes.INPUT_CURRENCY_VALUE: {
      return {
        ...state,
        amount: action.payload,
      };
    }
    case actionTypes.CONVERT_CURRENCY: {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
  // return state;
};
export default reducer;
