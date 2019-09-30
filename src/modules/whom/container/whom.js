import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { getWhom, getWhomIdle } from "../actions";
import { selectWhom } from "../selectors";
import { addUsersToRequest } from "../../userInfo/actions";
import BadgeSidebar from "../../../components/badgesidebar";

class Whom extends PureComponent {
  state = {};
  componentDidMount() {
    const { getWhom } = this.props;
    getWhom();
  }
  componentDidUpdate() {
    const { addUsersToRequest, whomItems, status, getWhomIdle } = this.props;
    if (status === "SUCCESS") {
      getWhomIdle();

      let usersRequests = [];
      if (whomItems.length > 0) {
        whomItems.map(item => {
          usersRequests = [...usersRequests, item.userId];
        });
      }
      if (usersRequests.length > 0) {
        console.log("usersRequests", usersRequests);
        addUsersToRequest(usersRequests);
      }
    }
  }
  render() {
    const { whomItems } = this.props;
    return (
      <Fragment>
        <div id="thx-whom">
          <div className="head-green angle-right">
            <h4>КОГО БЛАГОДАРЯТ</h4>
            <div className="flex-c-c relative">
              {/* <div id="thx-who-1-m" data-days="30" data-id="2" className="btn-filter">ЗА 1 МЕСЯЦ</div>
								<div id="thx-who-3-m" data-days="90" data-id="2" className="btn-filter">ЗА 3 МЕСЯЦА</div> */}
            </div>
          </div>
          <div className="whom reduced">
            {whomItems &&
              whomItems.length > 0 &&
              whomItems.map(item => (
                <BadgeSidebar key={item.key} item={item}></BadgeSidebar>
              ))}
          </div>
          {/* <div id="thx-who-more" className="btn-more">ЕЩЁ...</div> */}
        </div>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    whomItems: selectWhom(state),
    status: state.modules.whom.status
  }),
  { getWhom, getWhomIdle, addUsersToRequest }
)(Whom);
