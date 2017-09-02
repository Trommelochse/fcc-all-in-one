import React from 'react';
import AppBox from './AppBox.js';

import * as appData from '../data/appData.js'

const Home = (props) => {
  return (
    <div className="Home">
      <h2 className="app-title">App Overview:</h2>
      <div className="app-box-container clearfix">
        { appData.apps.map(app => {
          if (app.name === 'home') { return null }
          return (<AppBox key={app.name} {...app} />);
        }) }
      </div>
      <div className="info-container">
        <hr />
        <h3>Source:</h3>
        <a href="https://github.com/Trommelochse/fcc-all-in-one" className="github-link" target="_blank" rel="noopener noreferrer">
          <i className="ion-social-github"></i>
        </a>
      </div>
      <div className="info-container">
        <h3>Apps comleted:</h3>
        <span>{appData.apps.length -1}</span>
      </div>
    </div>
  )
}

export default Home;
