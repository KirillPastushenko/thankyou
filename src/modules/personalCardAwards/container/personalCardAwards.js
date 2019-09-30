import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { getAwards, getAwardsIdle } from "../actions";
import { selectAwards } from "../selectors";
import "./personalCardAwards.css";

class PersonalCardAwards extends PureComponent {
  state = {};
  componentDidMount() {
    const { userListId, getAwards } = this.props;
    getAwards(userListId);
  }
  render() {
    const { awards, userListId } = this.props;
    console.log(awards[userListId]);
    return (
      <Fragment>
        <h5>НАГРАДЫ:</h5>
        {awards[userListId] && (
          <div className="rewards flex-spb-t">
            {awards[userListId].map(item => (
              <div key={item.key} className="flex-col-c-t">
                <div className="reward">
                  <img src={item.image} alt={item.title} />
                </div>
                <span className="desc">{item.title}</span>
              </div>
            ))}
          </div>
        )}
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    awards: selectAwards(state)
  }),
  { getAwards, getAwardsIdle }
)(PersonalCardAwards);
