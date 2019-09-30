import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { getAllThanks, getWeekThanks } from "../../actions";
import moment from "moment";
import { maxBonusToSend } from "../../../../constants/config";
import { selectAll, selectMonth, selectToday } from "../../selectors";

class PersonCardThanks extends PureComponent {
  state = {};
  componentDidMount() {
    const { getAllThanks, getWeekThanks, userListId } = this.props;
    const today = moment();
    const dayFromMonday = today.isoWeekday();
    const monday = today
      .subtract(dayFromMonday, "days")
      .format("YYYY-MM-DD") + "T14:00:00Z";
    console.log(monday)
    getAllThanks(userListId);
    getWeekThanks({ userListId, monday });
  }
  render() {
    const { userListId, count, all, month, today } = this.props;
    console.log(all);
    return (
      <Fragment>
        <h5>БЛАГОДАРНОСТИ:</h5>
        <div className="flex-spb-t">
          <div className="flex-col-c-t">
            <div className="thanks-available num-red">
              {maxBonusToSend - count}
            </div>
            <span className="desc">ДОСТУПНО</span>
          </div>
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
    all: selectAll(state)
  }),
  {
    getAllThanks,
    getWeekThanks
  }
)(PersonCardThanks);
