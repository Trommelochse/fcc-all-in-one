import React from 'react';

const Footer = (props) => {

  const style = {
    backgroundImage: `url(${props.thumbUrl})`
  }

  return (
    <footer className="Footer">
      <p>by Clemens Janes - many thanks to all the Open Source libraries used in this Project!</p>
    </footer>
  )
}

export default Footer;
