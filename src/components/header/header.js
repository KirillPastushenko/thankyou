import React, { PureComponent, Fragment } from "react";
class ThanksHeader extends PureComponent {
  state = {};
  render() {
    return(
      <Fragment>
        <header>
          <div className="container">
            <a className="logo" href="/"></a>
          </div>
        </header>
      </Fragment>
    ); 
  }
}

export default ThanksHeader;
