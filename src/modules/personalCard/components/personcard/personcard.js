import React, { PureComponent, Fragment } from "react";
import PersonCardThanks from "../personcardthanks";
import { PersonalCardAwards } from "../../../personalCardAwards";
import Avatar from "../../../../components/avatar";
import "./personcard.css";
class PersonCard extends PureComponent {
  state = {};
  render() {
    const { userId, userListId, usersInfo, noHover, popup } = this.props;
    return (
      <Fragment>
        <div className="person">
          <div className="flex-l-c">
            <Avatar userId={userId} noHover={noHover} />
            <div className="preson-info">
              <div className="person-name">{usersInfo && usersInfo.title}</div>
              <div className="person-data">
                <span className="person-job">
                  {usersInfo && usersInfo.jobTitle}
                </span>
                {usersInfo && !!usersInfo.jobTitle && !!usersInfo.office && "/"}
                <span className="person-loc">
                  {usersInfo && usersInfo.office}
                </span>
              </div>
            </div>
          </div>
          {userListId && (
            <PersonCardThanks userListId={userListId} popup={popup} />
          )}
          {userListId && <PersonalCardAwards userListId={userListId} />}
        </div>
      </Fragment>
    );
  }
}

export default PersonCard;
