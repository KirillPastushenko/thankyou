import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./personalCard.css";
import PersonCard from "../components/personcard";
import { selectUserInfo } from "../selectors";
import { getUserListId } from "../../getUserListId/actions";

class PersonalCard extends Component {
  componentDidMount() {
    const { userId, idToList, getUserListId } = this.props;
    if (userId && !idToList[userId]) {
      getUserListId(userId);
    }
  }
  componentDidUpdate() {
    const { userId, idToList, getUserListId } = this.props;
    if (userId && !idToList[userId]) {
      //getUserListId(userId);
    }
  }
  render() {
    const { usersInfo, userId, idToList } = this.props;
    return (
      <Fragment>
        <PersonCard
          userId={userId}
          userListId={idToList[userId]}
          usersInfo={usersInfo[userId]}
        />
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    usersInfo: selectUserInfo(state),
    idToList: state.modules.users.idToList
  }),
  {
    getUserListId
  }
)(PersonalCard);
