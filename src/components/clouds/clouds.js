import React, { PureComponent, Fragment } from "react";
import "./clouds.css";
class Clouds extends PureComponent {
  state = {};
  render() {
    return(
      <Fragment>
        <div className="clouds-wrap">
            <div className="cloud cloud1"></div>
            <div className="cloud cloud2"></div>
            <div className="cloud cloud3"></div>
            <div className="cloud cloud4"></div>
            <div className="cloud cloud5"></div>
            <div className="cloud cloud6"></div>
            <div className="cloud cloud7"></div>
        </div>
      </Fragment>
    ); 
  }
}

export default Clouds;
