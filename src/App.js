import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home.js';
import HomeLip from './components/HomeLip.js';
import QuoteApp from './components/QuoteApp/QuoteApp.js';
import WeatherApp from './components/WeatherApp/WeatherApp.js';
import WikiApp from './components/WikiApp/WikiApp.js';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      subApp: 'home'
    }
  }

  render() {
    return (
      <div className="App">
        <Route exact path='/' component={Home} />
        <Route exact path='/quote' component={QuoteApp} />
        <Route exact path='/weather' component={WeatherApp} />
        <Route exact path='/wiki' component={WikiApp} />
        <HomeLip />
      </div>
    );
  }
}

export default App;
