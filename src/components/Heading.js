import React from 'react';

const Heading = (props) => {
  return (
    <div className="Heading">
      <h1>{ props.title }</h1>
      <h3>{ props.subtitle }</h3>
    </div>
  )
}

export default Heading;
