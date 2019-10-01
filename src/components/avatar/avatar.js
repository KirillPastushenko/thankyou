import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./avatar.css";
import { PersonalCard } from "../../modules/personalCard";
class Avatar extends Component {
  state = {
    show: false
  };
  handleMouseEnter = e => {
    const { noHover } = this.props;
    if (!noHover) this.setState({ show: true });
  };
  handleMouseLeave = e => {
    const { noHover } = this.props;
    if (!noHover) this.setState({ show: false });
  };
  render() {
    const { usersInfo, userId, title, rating } = this.props;
    const { show } = this.state;
    return (
      <Fragment>
        <div
          className={title ? "person-container flex-l-c" : "person-container"}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <div className="person-photo">
            {usersInfo[userId] && usersInfo[userId].Picture && (
              <img src={usersInfo[userId].Picture.get_url()} alt="avatar" />
            )}
          </div>
          {title && (
            <div className="preson-info">
              {rating > -1 && <div className="person-rating">{rating}</div>}
              <div className="person-name">{title}</div>
            </div>
          )}
          {show && <PersonalCard userId={userId} popup={true} />}
        </div>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    usersInfo: state.modules.usersInfo.info
  }),
  {}
)(Avatar);
