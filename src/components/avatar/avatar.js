import React, { Component } from "react";
import { connect } from "react-redux";
import "./avatar.css";
class Avatar extends Component {
  state = {};
  render() {
    const { usersInfo, userId } = this.props;
    return (
      <div className="person-photo">
        {usersInfo[userId] && (
          <img src={usersInfo[userId].Picture.get_url()} alt="avatar" />
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    usersInfo: state.modules.usersInfo.info
  }),
  {}
)(Avatar);
