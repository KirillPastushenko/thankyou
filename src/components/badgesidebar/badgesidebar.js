import React, { PureComponent, Fragment } from "react";
import Avatar from "../../components/avatar";
import "./badgesidebar.css";
class BadgeSidebar extends PureComponent {
  state = {};
  render() {
    const { item } = this.props;
    return (
      <Fragment>
        <div className="badge flex-l-c">
          <Avatar userId={item.userId} title={item.title} rating={item.rating} />
        </div>
      </Fragment>
    );
  }
}

export default BadgeSidebar;
