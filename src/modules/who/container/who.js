import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { getWho, getWhoIdle } from "../actions";
import { selectWho } from "../selectors";
import { addUsersToRequest } from "../../userInfo/actions";
import BadgeSidebar from "../../../components/badgesidebar";

class Who extends PureComponent {
  state = {};
  componentDidMount() {
    const { getWho } = this.props;
    getWho();
  }
  componentDidUpdate() {
    const { addUsersToRequest, whoItems, status, getWhoIdle } = this.props;
    if (status === "SUCCESS") {
      getWhoIdle();

      let usersRequests = [];
      if (whoItems.length > 0) {
        whoItems.map(item => {
          usersRequests = [...usersRequests, item.userId];
        });
      }
      if (usersRequests.length > 0) {
        addUsersToRequest(usersRequests);
      }
    }
  }
  render() {
    const { whoItems } = this.props;
    return (
      <Fragment>
        <div id="thx-who">
          <div className="head-yellow angle-right">
            <h4>КТО БЛАГОДАРИТ</h4>
            <div className="flex-c-c relative">
              {/* <div id="thx-who-1-m" data-days="30" data-id="2" className="btn-filter">ЗА 1 МЕСЯЦ</div>
								<div id="thx-who-3-m" data-days="90" data-id="2" className="btn-filter">ЗА 3 МЕСЯЦА</div> */}
            </div>
          </div>
          <div className="who reduced">
            {whoItems &&
              whoItems.length > 0 &&
              whoItems.map(item => (
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
    whoItems: selectWho(state),
    status: state.modules.who.status
  }),
  { getWho, getWhoIdle, addUsersToRequest }
)(Who);
