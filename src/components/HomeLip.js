import React from 'react';
import { Link } from 'react-router-dom'

const Home = (props) => {
  return (
    <Link to="/" className="HomeLip">
      <i className="fa fa-home"></i>
    </Link>
  )
}

export default Home;
