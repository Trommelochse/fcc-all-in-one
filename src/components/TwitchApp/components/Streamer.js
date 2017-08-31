import React, { Component } from 'react';

class Streamer extends Component {

  renderViewLink() {
    if (this.props.stream) {
      return (
        <a href={this.props.stream.channel.url} target="_blank">
          <i className="fa fa-eye" aria-hidden="true"></i>
        </a>
      )
    }
    return <i className="fa fa-eye-slash" aria-hidden="true"></i>
  }

  render() {

    const streamStatus = this.props.stream ? this.props.stream.game : 'Offline';

    return (
      <div className="Streamer">
        <div className="streamer-logo">
          <img
            src={this.props.logo || 'http://wwemotors.com/_img/no-img-placeholder.png'}
            alt={this.props.display_name} />
        </div>
        <div className="streamer-name">{this.props.display_name}</div>
        <div className="streamer-status"><p>{streamStatus}</p></div>
        <div className="streamer-option">
          {this.renderViewLink()}
        </div>
      </div>
    );
  }
}

export default Streamer;
