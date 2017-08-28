import React from 'react';

const WikiResult = (props) => {
  return (
    <div className="wiki-result-container" key={props.pageid}>
      <a href={'https://en.wikipedia.org/?curid=' + props.pageid} target="_blank">{props.title}</a>
    </div>
  )
}

export default WikiResult;
