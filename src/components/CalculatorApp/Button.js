import React from 'react';

const Button = (props) => {
  const isDisabled = props.isDisabled;
  return(
    <button
      id={props.htmlID}
      className={props.classes}
      value={props.value}
      onClick={props.onClick}
      disabled={isDisabled}
      >{props.value}
    </button>
  )
}

export default Button;
