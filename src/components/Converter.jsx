import { Button, Card, Form, message } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import * as conversionActionCreators from '../store/actions/conversion';
import Inputbox from './Inputbox';
import Result from './Result';
import SelectCurrency from './SelectCurrency';

const Converter = (props) => {
  const [result, setResult] = useState(0);
  const [intermediateCrossresult, setIntermediateCrossResult] = useState(0);
  const [finalCrossresult, setfinalCrossResult] = useState(0);
  const [errorFlag, setErrorFlag] = useState(false);
  const rates = {
    AUDUSD: 0.8371,
    CADUSD: 0.8711,
    USDCNY: 6.1715,
    EURUSD: 1.2315,
    GBPUSD: 1.5683,
    NZDUSD: 0.775,
    USDJPY: 119.95,
    EURCZK: 27.6028,
    EURDKK: 7.4405,
    EURNOK: 8.6651,
  };

  useEffect(() => {
    setResult(finalCrossresult);
    return () => {};
  }, [intermediateCrossresult]);

  useEffect(() => {
    return () => {
      message.info(
        `Unable to find the rate for ${props.baseCurrency}/${props.termsCurrency}`
      );
    };
  }, [errorFlag]);

  const handleSubmit = () => {
    defineFunctionCall(props.baseCurrency, props.termsCurrency, props.amount);
  };

  const defineFunctionCall = (base, terms, amount) => {
    // console.log("defineFunctionCall", base, terms, amount);
    if (base === terms) {
      setResult(amount);
    } else if (rates.hasOwnProperty(`${base}${terms}`))
      directValues(base, terms, amount);
    else if (rates.hasOwnProperty(`${terms}${base}`))
      reversedValues(base, terms, amount);
    else crossedValues(base, terms, amount);
  };

  const directValues = (base, terms, amount) => {
    console.log("directValues");
    for (let [key, value] of Object.entries(rates)) {
      if (key === `${base}${terms}`) {
        let res = key.includes("JPY")
          ? Math.round(amount * value)
          : (amount * value).toFixed(2);
        setResult(res);
      }
    }
  };

  const reversedValues = (base, terms, amount) => {
    console.log("reversedValues");
    for (let [key, value] of Object.entries(rates)) {
      if (key === `${terms}${base}`) {
        let res = key.includes("JPY")
          ? Math.round(amount * (1 / value))
          : (amount * (1 / value)).toFixed(2);
        setResult(res);
      }
    }
  };
  const crossedValues = (base, terms, amount) => {
    if (base === "AUD" || "CAD" || "CNY" || "EUR" || "GBP" || "JPY" || "NSD") {
      crossInitialStep(base, "USD", terms, amount);
    }
    if (base === "USD") {
      console.log("Base USD");
      crossInitialStep(base, "EUR", terms, amount);
    }
    if (base === "NOK") {
      console.log("Base NOK");
      if (terms === "CZK" || "DKK" || "USD") {
        crossInitialStep(base, "EUR", terms, amount);
      }
    }
    if (base === "DKK") {
      console.log("Base DKK");
      if (terms === "CZK" || "NOK" || "USD") {
        crossInitialStep(base, "EUR", terms, amount);
      }
    }
    if (base === "CZK") {
      console.log("Base CZK");
      if (terms === "DKK" || "NOK" || "USD") {
        crossInitialStep(base, "EUR", terms, amount);
      }
    }
  };
  const crossInitialStep = (base, intermediateTerms, terms, amount) => {
    for (let [key, value] of Object.entries(rates)) {
      if (
        key === `${base}${intermediateTerms}` ||
        key === `${intermediateTerms}${base}`
      ) {
        // setIntermediateCrossResult(parseInt(amount) * value);
        crossFinalStep(intermediateTerms, terms, parseInt(amount) * value);
      } else setErrorFlag(!errorFlag);
    }
  };

  const crossFinalStep = (newBase, terms, intermediateCrossresult) => {
    for (let [key, value] of Object.entries(rates)) {
      if (key === `${newBase}${terms}` || key === `${terms}${newBase}`) {
        // setfinalCrossResult(intermediateCrossresult * value);
        // console.log({ finalCrossresult });
        setResult(intermediateCrossresult * value);
      } else setErrorFlag(!errorFlag);
    }
  };

  return (
    <Card
      title="Currency Converter"
      bordered={false}
      style={{ width: 900, margin: "auto", display: "block" }}>
      <Form layout="inline" onFinish={handleSubmit}>
        <FormItem>
          <Inputbox
            handleInput={(e) => props.changeInputCurrencyVal(e.target.value)}
            amountVal={props.amount}
          />
        </FormItem>
        <FormItem label="From" name="base">
          <SelectCurrency
            handleSelectCurrency={(e) => props.changeBaseCurrency(e)}
          />
        </FormItem>
        <FormItem label="To" name="terms">
          <SelectCurrency
            handleSelectCurrency={(e) => props.changeTermsCurrency(e)}
          />
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            Convert
          </Button>
        </FormItem>
        <FormItem>
          <Result finalRes={result} />
        </FormItem>
      </Form>
    </Card>
  );
};

const mapStateToProps = (state) => {
  console.log({ state });
  return {
    amount: state.amount,
    baseCurrency: state.base,
    termsCurrency: state.terms,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeInputCurrencyVal: (e) =>
      dispatch(conversionActionCreators.inputCurrencyVal(e)),
    changeBaseCurrency: (e) => dispatch(conversionActionCreators.changeBase(e)),
    changeTermsCurrency: (e) =>
      dispatch(conversionActionCreators.changeTerms(e)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Converter);
