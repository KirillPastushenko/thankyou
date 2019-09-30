import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getUsersInfo, getUsersInfoIdle, addUsersToRequest } from "../actions";

class UserInfo extends Component {
  state = {};
  componentDidMount() {
    const { getUsersInfo, usersInfo } = this.props;
    let usersRequests = [];
    if (Object.keys(usersInfo).length > 0) {
      Object.keys(usersInfo).map(key => {
        usersRequests = [...usersRequests, parseInt(key)];
      });
    }
    if (usersRequests.length > 0) {
      getUsersInfo(usersRequests);
    }
  }
  componentDidUpdate() {
    const { getUsersInfo, getUsersInfoIdle, usersInfo, status } = this.props;
    let usersRequests = [];
    if (status !== "LOADING") {
      if (Object.keys(usersInfo).length > 0) {
        Object.keys(usersInfo).map(key => {
          if (!usersInfo[key]) {
            usersRequests = [...usersRequests, parseInt(key)];
          }
        });
      }
      if (usersRequests.length > 0) {
        getUsersInfo(usersRequests);
      } else {
        if (status === "SUCCESS") {
          getUsersInfoIdle();
        }
      }
    }
  }

  render() {
    return <Fragment />;
  }
}

export default connect(
  state => ({
    usersInfo: state.modules.usersInfo.info,
    status: state.modules.usersInfo.status
  }),
  { getUsersInfo, addUsersToRequest, getUsersInfoIdle }
)(UserInfo);
