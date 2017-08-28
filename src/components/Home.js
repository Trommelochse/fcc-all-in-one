import React from 'react';
import AppBox from './AppBox.js';
import Heading from './Heading.js';

import * as appData from '../data/appData.js'

const Home = (props) => {
  return (
    <div className="Home">
      <Heading title="FCC-in-ONE" subtitle="All FCC Front End Projects in one React Single Page Application" />
      <div className="app-box-container">
        { appData.apps.map(app => {
          if (app.name === 'home') { return null }
          return (<AppBox key={app.name} {...app} />);
        }) }
      </div>
    </div>
  )
}

export default Home;
