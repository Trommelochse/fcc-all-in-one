import React, { Component } from 'react';
import WikiResult from './components/WikiResult.js';

import axios from 'axios';

import './WikiApp.css';

class WikiApp extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getWikipediaEntries = this.getWikipediaEntries.bind(this);
  }

  componentDidMount() {

  }

  handleInputChange(ev) {
    this.setState({searchQuery: ev.target.value});
  }

  getWikipediaEntries(ev) {
    ev.preventDefault();
    const searchQuery = this.state.searchQuery;
    if (!searchQuery) {return}
    axios.get('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        list: 'search',
        srsearch: searchQuery,
        srlimit: '100',
        format: 'json',
        origin: '*'
      }
    })
    .then(response => {
      let searchResults = response.data.query.search;
      searchResults = searchResults.sort((a,b) => {return a.wordcount < b.wordcount});
      searchResults = searchResults.splice(0, 16);
      searchResults.shift();
      this.setState({searchResults});
    });
  }

  renderResults() {
    if (!this.state.searchResults) {return null}
    return (
      <div>
        {this.state.searchResults.map((result, i) => <WikiResult {...result} key={result.pageid}/>)}
      </div>
    )
  }

  getRandomArticle(ev) {
    ev.preventDefault();
  }

  render() {

    return (
      <div className="WikiApp">
        <h2 className="app-title">Wikipedia App</h2>
        <div className="wiki-container">
          <form className="wiki-search-container" onSubmit={this.getWikipediaEntries}>
            <input
              className="wiki-input"
              onChange={this.handleInputChange}
              placeholder="Enter a topic"/>
            <div className="wiki-button-container">
              <button className="wiki-button" type="submit">Search</button>
              <a className="wiki-button"
                href="https://en.wikipedia.org/wiki/Special:Random"
                target="_blank"
                rel="noopener noreferrer">Random Article</a>
            </div>
          </form>
          { this.renderResults() }
        </div>
      </div>
    );
  }
}

export default WikiApp;
