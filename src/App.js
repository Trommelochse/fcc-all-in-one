import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import Home from './components/Home.js';
import QuoteApp from './components/QuoteApp/QuoteApp.js';
import WeatherApp from './components/WeatherApp/WeatherApp.js';
import WikiApp from './components/WikiApp/WikiApp.js';
import TwitchApp from './components/TwitchApp/TwitchApp.js';
import CalculatorApp from './components/CalculatorApp/CalculatorApp.js';
import PomodoroApp from './components/PomodoroApp/PomodoroApp.js';

import * as appData from './data/appData.js'


import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Navbar apps={appData.apps}/>
        <Route exact path='/' component={Home} />
        <Route exact path='/quote' component={QuoteApp} />
        <Route exact path='/weather' component={WeatherApp} />
        <Route exact path='/wiki' component={WikiApp} />
        <Route exact path='/twitch' component={TwitchApp} />
        <Route exact path='/calculator' component={CalculatorApp} />
        <Route exact path='/pomodoro' component={PomodoroApp} />
        <Footer />
      </div>
    );
  }
}

export default App;
