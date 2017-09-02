import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {

  const style = {
    backgroundColor: '#2c3e50'
  }

  return (
    <div className="Navbar" style={style}>
      <Link to="/" className="navbar-home">
        <i className="fa fa-th" aria-hidden="true"></i>
        <span>All Apps</span>
      </Link>
      <div className="navbar-title">
        <h1>13 FCC Front End Projects in one React App</h1>
      </div>
    </div>
  )
}

export default Navbar;
