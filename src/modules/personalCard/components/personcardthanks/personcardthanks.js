import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getAllThanks, getWeekThanks } from "../../actions";
import { addThankYouIdle } from "../../../../actions";
import moment from "moment";
import { maxBonusToSend } from "../../../../constants/config";
import { selectAll, selectMonth, selectToday } from "../../selectors";

class PersonCardThanks extends Component {
  state = {};
  componentDidMount() {
    const { getAllThanks, getWeekThanks, userListId, popup } = this.props;
    const today = moment();
    const dayFromMonday = today.isoWeekday();
    const monday =
      today.subtract(dayFromMonday, "days").format("YYYY-MM-DD") + "T14:00:00Z";
    getAllThanks(userListId);
    if (!popup) {
      getWeekThanks({ userListId, monday });
    }
  }
  componentDidUpdate() {
    const { addThankYouStatus, userListId, getWeekThanks, popup } = this.props;
    if (addThankYouStatus === "SUCCESS") {
      if (!popup) {
        const today = moment();
        const dayFromMonday = today.isoWeekday();
        const monday =
          today.subtract(dayFromMonday, "days").format("YYYY-MM-DD") +
          "T14:00:00Z";
        getWeekThanks({ userListId, monday });
      }
    }
  }
  render() {
    const { userListId, count, all, month, today, popup } = this.props;
    return (
      <Fragment>
        <h5>БЛАГОДАРНОСТИ:</h5>
        <div className="flex-spb-t">
          {!popup && (
            <div className="flex-col-c-t">
              <div className="thanks-available num-red">
                {maxBonusToSend - count}
              </div>
              <span className="desc">ДОСТУПНО</span>
            </div>
          )}
          <div className="flex-col-c-t">
            <div className="thanks-today num-green">{today[userListId]}</div>
            <span className="desc">
              ПОЛУЧЕНО <br />
              СЕГОДНЯ
            </span>
          </div>
          <div className="flex-col-c-t">
            <div className="thanks-month num-green">{month[userListId]}</div>
            <span className="desc">
              ПОЛУЧЕНО <br />
              В ЭТОМ МЕСЯЦЕ
            </span>
          </div>
          <div className="flex-col-c-t">
            <div className="thanks-alltime num-green">{all[userListId]}</div>
            <span className="desc">
              ПОЛУЧЕНО <br />
              ЗА ВСЕ ВРЕМЯ
            </span>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    count: state.modules.thanks.count,
    today: selectToday(state),
    month: selectMonth(state),
    all: selectAll(state),
    addThankYouStatus: state.status.addThankYouStatus
  }),
  {
    getAllThanks,
    getWeekThanks
  }
)(PersonCardThanks);
