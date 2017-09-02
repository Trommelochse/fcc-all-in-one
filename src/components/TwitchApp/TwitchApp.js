import React, { Component } from 'react';
import Streamer from './components/Streamer.js'

import axios from 'axios';

import './TwitchApp.css';

class TwitchApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      favorites: ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"]
    };
    this.renderStreamers = this.renderStreamers.bind(this);
  }

  setChannels(channels) {
    console.log(channels);
    this.setState(channels);
  }

  getData() {
    const client_id = '2utooqesurkoi3fe9dkg2nmxlc2fjh'
    let channels = [];
    function getChannel(name) {
       return axios.get('https://api.twitch.tv/kraken/channels/' + name, {params: {client_id}})
    };
    function getStream(name) {
       return axios.get('https://api.twitch.tv/kraken/streams/' + name, {params: {client_id}})
    };

    for (let i=0; i<this.state.favorites.length; i++) {
      const name = this.state.favorites[i];
      axios.all([getChannel(name), getStream(name)])
        .then(([channel, stream]) => {
          channel = channel.data;
          channel.stream = stream.data.stream;
          channels.push(channel);
          // set State if all data has been received
          if (channels.length === this.state.favorites.length) {
            this.setState({channels});
          }
        });
    }
  }

  componentDidMount() {
    this.getData();
  }

  renderStreamers() {
    if (!this.state.channels) {return null}
    return (
      <div className="streamer-container">
        {this.state.channels.map(channel => <Streamer {...channel} key={channel._id}/>)}
      </div>
    )

  }

  render() {

    return (
      <div className="TwitchApp">
        <h2 className="app-title">Twitch Streamer App</h2>
        { this.renderStreamers() }
      </div>
    );
  }
}

export default TwitchApp;
