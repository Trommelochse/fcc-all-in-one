// This code has been written a while ago - please excuse inconsistency

import React, { Component } from 'react';
import Display from './Display.js';
import Button from './Button.js';

import constants from './constants/constants.js';

import * as utils from './utils/utils.js';

import './CalculatorApp.css';

class CalculatorApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentNumber: '0',
      calculation: [],
      isOperating: false,
      showsResult: false
    }
    this.addDigit = this.addDigit.bind(this);
    this.addOperator = this.addOperator.bind(this);
    this.onCalculate = this.onCalculate.bind(this);
  }

  addDigit(digit) {
    if(this.state.isOperating) {
      this.setState({
        isOperating: false
      });
    }
    let number = this.state.currentNumber;
    if (this.state.showsResult) {
      this.setState({
        currentNumber: digit,
        showsResult: false
      });
      return
    }
    // eslint-disable-next-line
    if (number == '0') {
      this.setState({
        currentNumber: digit
      });
      return
    } else {
      this.setState({
        currentNumber: number + digit
      });
    }
  }

  addOperator(operator) {
    if (this.state.isOperating) {
      if(operator === '-') {
        this.setState({
          currentNumber: '-'
        });
        return
      };
      return
    }

    else {
      const currentNumber = parseFloat(this.state.currentNumber);
      const calculation = this.state.calculation;
      calculation.push(currentNumber);
      calculation.push(operator);
      this.setState({
        isOperating: true,
        calculation,
        currentNumber: '0'
      })
    }
  }

  onCalculate() {
    const calculation = this.state.calculation;
    const currentNumber = parseFloat(this.state.currentNumber);
    calculation.push(currentNumber);
    const result = utils.parseCalculation(calculation);
    this.setState({
      currentNumber: result,
      calculation: [],
      showsResult: true
    });
  }

  handleOption(option) {
    switch (option) {
      case 'CE': {
        this.setState({
          currentNumber: '0',
          calculation: []
        });
        break;
      }
      case 'C': {
        this.setState({
          currentNumber: '0'
        });
        break;
      }
      default: return

    }
  }

  render() {
    return (
      <div className="CalculatorApp clearfix">
        <h2 className="app-title">Local Weather App</h2>
        <Display
          currentNumber={this.state.currentNumber}
          calculation={this.state.calculation}
        />
      <div className="OptionContainer clearfix">
        { constants.optionButtons.map((el, i) => {
          return (
            <Button key={i} value={el} onClick={(ev) => {
                this.handleOption(ev.target.value)
              }}/>
          )
        }) }
      </div>
      <div className="NumberContainer clearfix">
          { constants.numberButtons.map((el, i) => {
            const classes = el === 0 ? ['btn-zero'] : null;
            return (
              <Button key={i} value={el} classes={classes} onClick={(ev) => {
                  this.addDigit(ev.target.value);}} />
            )
          }) }
        </div>
        <div className="OperatorContainer clearfix">
          { constants.operatorButtons.map((el, i) => {
            return (
              <Button key={i} value={el} onClick={(ev) => {
                  this.addOperator(ev.target.value)
                }}/>
            )
          }) }
        </div>
        <Button
          htmlID="btn-equal"
          value="="
          onClick={this.onCalculate} />
      </div>
    );
  }
}

export default CalculatorApp;
