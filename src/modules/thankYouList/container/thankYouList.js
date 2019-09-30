import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./thankYouList.css";
import { getThankYou } from "../actions";
import { addUsersToRequest } from "../../userInfo/actions";
import { selectThankYou } from "../selectors";
import ThankYouItem from "../components/thankYouItem";

class ThankYouList extends Component {
  componentDidMount() {
    const { getThankYou } = this.props;
    getThankYou();
  }
  componentDidUpdate() {
    const { addUsersToRequest, thankYou } = this.props;
    console.log("ThankYouList: ", thankYou);
    let usersRequests = [];
    if (thankYou.length > 0) {
      thankYou.map(item => {
        usersRequests = [...usersRequests, item.toUserId];
        usersRequests = [...usersRequests, item.fromUserId];
      });
    }
    if (usersRequests.length > 0) {
      addUsersToRequest(usersRequests);
    }
  }
  render() {
    const { thankYou } = this.props;
    return (
      <Fragment>
        <div id="thx-news" className="col-8">
          <div className="head-red angle-left">
            <h4>ДОСКА БЛАГОДАРНОСТЕЙ</h4>
          </div>
          <div className="thanks here">
            {thankYou &&
              thankYou.map(item => (
                <ThankYouItem key={item.id}>{item}</ThankYouItem>
              ))}
          </div>
          <div id="thx-news-more" className="btn-more all">
            ЕЩЁ...
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    thankYou: selectThankYou(state)
  }),
  { getThankYou, addUsersToRequest }
)(ThankYouList);
