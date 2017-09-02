import React, { Component } from 'react';
import Loader from '../Loader.js';

import axios from 'axios';

import './QuoteApp.css';

class QuoteApp extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.getQuote = this.getQuote.bind(this);
  }

  getQuote() {
    axios.get('https://talaikis.com/api/quotes/random/')
    .then(response => {
      const quote = response.data;
      this.setState({ quote })
    });
  }

  componentDidMount() {
    this.getQuote();
  }

  render() {
    if (!this.state.quote) { return <Loader /> }

    const quote = this.state.quote;
    const tweetLink = `https://twitter.com/intent/tweet?hashtags=${quote.cat}&text="${quote.quote}" - ${quote.author}`;

    return (
      <div className="QuoteApp">
        <h2 className="app-title">Quote App</h2>
        <div className="quote-container">
          <div className="quote-content">
            <blockquote>{ quote.quote }</blockquote>
            <p className="quote-author">- { quote.author }</p>
          </div>
          <div className="quote-options">
            <button className="quote-btn-next" onClick={this.getQuote}>Next Quote</button>
            <a href={tweetLink} className="quote-btn-tweet" target="_blank"><i className="fa fa-twitter" aria-hidden="true"></i> </a>
          </div>
        </div>
      </div>
    );
  }
}

export default QuoteApp;
