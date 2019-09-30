import { createActions } from "redux-actions";

const {
  getWeekThanks,
  getWeekThanksSuccess,
  getWeekThanksFailure,
  getWeekThanksIdle
} = createActions(
  "GET_WEEK_THANKS",
  "GET_WEEK_THANKS_SUCCESS",
  "GET_WEEK_THANKS_FAILURE",
  "GET_WEEK_THANKS_IDLE"
);

const {
  getTodayThanks,
  getTodayThanksSuccess,
  getTodayThanksFailure,
  getTodayThanksIdle,
  setTodayThanks
} = createActions(
  "GET_TODAY_THANKS",
  "GET_TODAY_THANKS_SUCCESS",
  "GET_TODAY_THANKS_FAILURE",
  "GET_TODAY_THANKS_IDLE",
  "SET_TODAY_THANKS"
);

const {
  getMonthThanks,
  getMonthThanksSuccess,
  getMonthThanksFailure,
  getMonthThanksIdle,
  setMonthThanks
} = createActions(
  "GET_MONTH_THANKS",
  "GET_MONTH_THANKS_SUCCESS",
  "GET_MONTH_THANKS_FAILURE",
  "GET_MONTH_THANKS_IDLE",
  "SET_MONTH_THANKS"
);

const {
  getAllThanks,
  getAllThanksSuccess,
  getAllThanksFailure,
  getAllThanksIdle
} = createActions(
  "GET_ALL_THANKS",
  "GET_ALL_THANKS_SUCCESS",
  "GET_ALL_THANKS_FAILURE",
  "GET_ALL_THANKS_IDLE"
);

export {
  getWeekThanks,
  getWeekThanksSuccess,
  getWeekThanksFailure,
  getWeekThanksIdle,
  getTodayThanks,
  getTodayThanksSuccess,
  getTodayThanksFailure,
  getTodayThanksIdle,
  getMonthThanks,
  getMonthThanksSuccess,
  getMonthThanksFailure,
  getMonthThanksIdle,
  getAllThanks,
  getAllThanksSuccess,
  getAllThanksFailure,
  getAllThanksIdle,
  setMonthThanks,
  setTodayThanks
};
