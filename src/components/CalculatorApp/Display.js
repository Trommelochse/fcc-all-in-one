import React, { Component } from 'react';

class Display extends Component {
  render()  {
    return(
      <div className="Display">
        <div className="Display__main">
          <p>{this.props.currentNumber}</p>
        </div>
        <div className="Display__calculation">
          <p>{this.props.calculation}</p>
        </div>
      </div>
    )
  }
}

export default Display;
