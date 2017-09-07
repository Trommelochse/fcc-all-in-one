import React, { Component } from 'react';

import * as utils from './utils/utils.js';

import './PomodoroApp.css';

class PomodoroApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pomodoroDuration: 25*60,
      breakDuration: 5*60,
      isRunning: false,
      isPausing: false,
      onBreak: false,
      timeLeft: 25*60,
      pomodorosCompleted: 0
    };
    this.pomodoroStart = this.pomodoroStart.bind(this);
    this.pomodoroPause = this.pomodoroPause.bind(this);
    this.clearPomodoro = this.clearPomodoro.bind(this);
  }

  pomodoroStart() {
    if (this.state.isRunning) return;
    const pomodoroInterval = setInterval(() => {
      if (this.state.timeLeft !== 0) {
        this.setState({timeLeft: this.state.timeLeft - 1});
      } else {
        const newDuration = this.state.onBreak ?
        this.state.pomodoroDuration : this.state.breakDuration;
        this.setState({
          onBreak: !this.state.onBreak,
          timeLeft: newDuration,
          pomodorosCompleted: this.state.pomodorosCompleted + 1
        });
      }
    }, 10);
    this.setState({
      isRunning: true,
      pomodoroInterval
    });
  }

  pomodoroPause() {
    const interval = this.state.pomodoroInterval;
    clearInterval(interval);
    this.setState({isRunning: false})
  }

  increasePomodoro() {
    this.setState({
      pomodoroDuration: this.state.pomodoroDuration + 60,
      timeLeft: this.state.timeLeft + 60,
    });
  }
  decreasePomodoro() {
    if (this.state.pomodoroDuration <= 60 || this.state.timeLeft <= 60) {
      return
    }
    this.setState({
      pomodoroDuration: this.state.pomodoroDuration - 60,
      timeLeft: this.state.timeLeft - 60,
    });
  }

  clearPomodoro() {
    this.setState({
      timeLeft: this.state.pomodoroDuration,
      breakTimeLeft: this.state.breakDuration,
      onBreak: false
    });
  }

  render() {
    const onBreak = this.state.onBreak;
    // make the overlay move :)
    const duration = !onBreak ? this.state.pomodoroDuration : this.state.breakDuration;
    const passed = duration - this.state.timeLeft;
    let percentPassed = passed ? passed / duration * 100 : 0;
    percentPassed = onBreak ? 100 - percentPassed : percentPassed;
    const overlayStyle = {
      top: onBreak ? '0' : null,
      height: percentPassed + '%',
      background: onBreak ? '#006E3E' : null,
    }

    return (
      <div className="PomodoroApp">
        <div className="pomodoro-container">
          <div className="pomodoro-tomato">
            <div className="pomodoro-overlay" style={overlayStyle} />
            <div className="pomodoro-tomato-inner">
              { this.state.isRunning || this.state.onBreak ? null :
              <div className="pomodoro-control">
                <i className="fa fa-plus-circle"
                   onClick={this.increasePomodoro.bind(this)}></i>
              </div> }
              <div className="pomodoro-info-container">
                <div className="pomodoro-time">
                  <span>
                    {utils.readableTime(this.state.timeLeft)}
                  </span>
                </div>
                <div className="pomodoro-status">
                  <span>{!this.state.onBreak ? '@Work' : 'on Break...'}</span>
                </div>
                <div className="pomodoro-cta">
                  {!this.state.isRunning ?
                  <button onClick={this.pomodoroStart}>Start</button> :
                  <button onClick={this.pomodoroPause}>Pause</button>}
                </div>
              </div>
              { this.state.isRunning ||  this.state.onBreak ? null :
              <div className="pomodoro-control">
                <i className="fa fa-minus-circle"
                   onClick={this.decreasePomodoro.bind(this)}></i>
              </div> }
            </div>
          </div>
          <div className="pomodoro-options">
              <button className="clear" onClick={this.clearPomodoro}>Clear</button>
          </div>
        </div>
      </div>
    );
  }
}

export default PomodoroApp;
