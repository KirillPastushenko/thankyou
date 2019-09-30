import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  getAllThanks,
  getAllThanksSuccess,
  getAllThanksFailure,
  getAllThanksIdle,
  getWeekThanks,
  getWeekThanksSuccess,
  getWeekThanksFailure,
  getWeekThanksIdle,
  setMonthThanks,
  setTodayThanks
} from "../actions";

const statusAll = handleActions(
  {
    [getAllThanks]: () => "LOADING",
    [getAllThanksSuccess]: () => "SUCCESS",
    [getAllThanksFailure]: () => "FAILURE",
    [getAllThanksIdle]: () => "IDLE"
  },
  "IDLE"
);
const statusWeek = handleActions(
  {
    [getWeekThanks]: () => "LOADING",
    [getWeekThanksSuccess]: () => "SUCCESS",
    [getWeekThanksFailure]: () => "FAILURE",
    [getWeekThanksIdle]: () => "IDLE"
  },
  "IDLE"
);

const all = handleActions(
  {
    [getAllThanksSuccess]: (state, action) => {
      return { ...state, ...action.payload };
    }
  },
  {}
);
const day = handleActions(
  {
    [setTodayThanks]: (state, action) => {
      return { ...state, ...action.payload };
    }
  },
  {}
);
const month = handleActions(
  {
    [setMonthThanks]: (state, action) => {
      return { ...state, ...action.payload };
    }
  },
  {}
);
const week = handleActions(
  {
    [getWeekThanksSuccess]: (state, action) => {
      return { ...state, ...action.payload };
    }
  },
  {}
);

const count = handleActions(
  {
    [getWeekThanksSuccess]: (state, action) => {
      let counter = 0;
      Object.keys(action.payload).map(key => {
        action.payload[key].map(item => {
          counter += item.AppScores;
        });
      });
      return counter;
    }
  },
  0
);

const thanks = combineReducers({
  statusAll,
  statusWeek,
  all,
  day,
  month,
  week,
  count
});
export { thanks };
