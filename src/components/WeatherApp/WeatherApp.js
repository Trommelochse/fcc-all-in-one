import React, { Component } from 'react';
import Heading from '../Heading.js';

import axios from 'axios';
import * as utils from './utils/utils.js'

import './WeatherApp.css';

class WeatherApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      units: 'metric'
    };
    this.getWeather = this.getWeather.bind(this);
    this.getData = this.getData.bind(this);
    this.changeUnits = this.changeUnits.bind(this);
    this.updateUnits = this.updateUnits.bind(this);
  }

  getData() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(response => {
        const location = response.coords;
        const lat = location.latitude;
        const lon = location.longitude;
        this.getWeather([lat, lon]);
      });
    }
    else {
      window.location = 'http://www.google.com'
    }
  }

  getWeather(coords) {
    if (coords) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords[0]}&lon=${coords[1]}&units=${this.state.units}&APPID=9dc81ccba5a4f8e1435723a65baf81de`)
      .then(response => {
        const data = response.data;
        this.setState({data});
      });
    }
  }

  changeUnits() {
      return new Promise((resolve, reject) => {
      this.setState({ units: this.state.units === 'metric' ? 'imperial' : 'metric'});
      if (1) {
        resolve(true);
      } else {
        reject(Error('Something went wrong'));
      }
    });
  }

  updateUnits() {
    this.changeUnits()
    .then(() => { this.getWeather([this.state.data.coord.lat, this.state.data.coord.lon]) });
  }

  componentDidMount() {
    this.getData();
  }

  render() {

    if (!this.state.data) { return null }

    const data = this.state.data;
    const windArrowStyle = {
      transform: `rotate(${data.wind.deg - 90}deg)`
    }
    let temperature = data.main.temp.toString();
    temperature = parseInt(temperature, 10);

    return (
      <div className="WeatherApp">
        <Heading title="Local Weather" subtitle="Check the current weather at your position" />
        <div className="weather-container">
          <div className="weather-condition-container">
            <h3 className="weather-city">{data.name}</h3>
            <img src={utils.getIcon(data.weather[0])} alt="weather" className="weather-icon"></img>
            <span className="weather-description">{data.weather[0].description}</span>
          </div>
          <div className="weather-detail-container">
            <div className="weather-detail weather-detail-temperature">
              <span className="weather-detail-span">{temperature}° {this.state.units === 'metric' ? 'C' : 'F'}</span>
              <p>Temperature</p>
            </div>
            <div className="weather-detail">
              <img src="http://clemensjanes.com/fcc-project/img/arrow.svg" alt="arrow" style={windArrowStyle}></img>
              <p>Wind Direction</p>
            </div>
            <div className="weather-detail">
              <span className="weather-detail-span">{data.main.pressure.toString().substr(0,4)} hPa</span>
              <p>Pressure</p>
            </div>
          </div>
        </div>
        <div className="weather-option-container">
          <button onClick={this.updateUnits}>Change Units</button>
        </div>
      </div>
    );
  }
}

export default WeatherApp;
