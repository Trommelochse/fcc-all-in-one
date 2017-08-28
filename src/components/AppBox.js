import React from 'react';
import { Link } from 'react-router-dom';

const AppBox = (props) => {

  const style = {
    backgroundImage: `url(${props.thumbUrl})`
  }

  return (
    <div className="AppBox">
      <Link to={`/${props.name}`} >
        <div className="app-box-background" style={style}></div>
        <div className="app-box-description" ><p>{ props.description }</p></div>
        <div className="app-box-title">
          <h3>{ props.title }</h3>
        </div>
      </Link>
    </div>
  )
}

export default AppBox;
