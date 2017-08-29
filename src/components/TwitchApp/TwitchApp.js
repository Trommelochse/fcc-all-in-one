import React, { Component } from 'react';
import Heading from '../Heading.js';
import Streamer from './components/Streamer.js'

import axios from 'axios';
import * as utils from './utils/utils.js';

import './TwitchApp.css';

class TwitchApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      favorites: ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]
    };
    this.renderStreamers = this.renderStreamers.bind(this);
  }

  setChannels(channels) {
    console.log(channels);
    this.setState(channels);
  }

  getData() {
    const client_id = '2utooqesurkoi3fe9dkg2nmxlc2fjh'
    const channels = [];
    function getChannel(name) {
       return axios.get('https://api.twitch.tv/kraken/channels/' + name, {params: {client_id}})
    };
    function getStream(name) {
       return axios.get('https://api.twitch.tv/kraken/streams/' + name, {params: {client_id}})
    };

    for (let i=0; i<this.state.favorites.length; i++) {
      const name = this.state.favorites[i];
      const channel = utils.getChannel(name);
    }
  }

  componentDidMount() {
    this.getData();
  }

  renderStreamers() {
    if (!this.state.channels) {return null}
    return (
      <div className="streamer-container">
        {this.state.channels.map(channel => <Streamer />)}
      </div>
    )

  }

  render() {

    return (
      <div className="TwitchApp">
        <Heading title="Twitch Streamer App" subtitle="Keep an overview of your favorite Twitch streamers" />
        { this.renderStreamers() }
      </div>
    );
  }
}

export default TwitchApp;
