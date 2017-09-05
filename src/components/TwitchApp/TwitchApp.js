import React, { Component } from 'react';
import Loader from '../Loader.js';
import Streamer from './components/Streamer.js'

import axios from 'axios';
import * as ls from './utils/localstorage.js'

import './TwitchApp.css';

class TwitchApp extends Component {

  constructor(props) {
    super(props);
    const favorites = ls.getFavorites() ||
    ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];
    this.state = {favorites: favorites};
    this.renderStreamers = this.renderStreamers.bind(this);
    this.handleChannelRequest = this.handleChannelRequest.bind(this);
  }

  getChannel(name, cb) {
    const client_id = '2utooqesurkoi3fe9dkg2nmxlc2fjh';
    function getChannelData(name) {
       return axios.get('https://api.twitch.tv/kraken/channels/' + name,
       {params: {client_id}})
    };
    function getStreamData(name) {
       return axios.get('https://api.twitch.tv/kraken/streams/' + name,
       {params: {client_id}})
    };

    axios.all([getChannelData(name), getStreamData(name)])
    .then(([channel, stream]) => {
      channel = channel.data;
      channel.stream = stream.data.stream;
      cb(channel);
    })
    .catch(err => {throw err});
  }

  handleChannelRequest(channel) {
    const channels = this.state.channels ? this.state.channels.concat([]) : [];
    channels.push(channel);
    this.setState({channels});
  }

  getFavoriteChannels() {
    const favorites = this.state.favorites;
    for (let i=0; i<favorites.length; i++) {
      this.getChannel(favorites[i], this.handleChannelRequest)
    }
  }

  componentDidMount() {
    ls.setFavorites(this.state.favorites);
    this.getFavoriteChannels();
  }

  renderStreamers() {
    if (!this.state.channels) {return <Loader />}
    return (
      <div className="streamer-container">
        {this.state.channels.map(channel => <Streamer {...channel} key={channel._id}/>)}
      </div>
    )
  }

  renderStreamerChips() {
    if (!this.state.channels) {return null}
    return (
      <div className="twitch-streamer-chip-container">
        {this.state.channels.map(channel => {
          return (
            <div
              className="twitch-streamer-chip"
              key={channel._id}
              onClick={() => {this.removeStreamer(channel.name) }}>
              <span>{channel.name}</span><i className="fa fa-times" aria-hidden="true"></i>
            </div>
          )
        })}
      </div>
    )
  }

  onNewChannelChange(ev) {
    this.setState({ newChannel: ev.target.value })
  }

  addStreamer(ev) {
    ev.preventDefault();
    const newChannel = this.state.newChannel;
    if (this.state.favorites.indexOf(newChannel) !== -1) {
      return
    }
    function checkAndSet(channel) {
      if (channel) {
        this.handleChannelRequest(channel);
        const lsFavorites = ls.getFavorites();
        lsFavorites ?
          lsFavorites.push(channel.name) : ls.setFavorites([channel.name]);
        ls.setFavorites(lsFavorites);
      }
      else {this.setState({newChannelError: true})}
    }
    this.getChannel(newChannel, checkAndSet.bind(this))
  }

  removeStreamer(name) {
    if (this.state.favorites.length === 1 || this.state.channels.length === 1 ) {
      return
    }
    const favorites = this.state.favorites.filter((favorite) => {
      return favorite.toLowerCase() !== name.toLowerCase();
    });
    const channels = this.state.channels.filter((channel) => {
      return channel.name.toLowerCase() !== name.toLowerCase();
    });
    ls.setFavorites(favorites);
    this.setState({favorites, channels});
  }

  render() {

    return (
      <div className="TwitchApp">
        <h2 className="app-title">Twitch Streamer App</h2>
        { this.renderStreamers() }
        <form className="twitch-add-streamer-form" onSubmit={this.addStreamer.bind(this)}>
          <button type="submit" className="twitch-button-add">Add Streamer</button>
          <input
            name="channelname"
            className="twitch-input"
            placeholder="channelname"
            onChange={this.onNewChannelChange.bind(this)}></input>
          { this.state.newChannelError ? <label className="input-error">Channel not found</label>: null }
        </form>
        <h4>Remove Streamer:</h4>
        { this.renderStreamerChips() }
      </div>
    );
  }
}

export default TwitchApp;
