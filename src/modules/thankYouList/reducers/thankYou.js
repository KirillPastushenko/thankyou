import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  getThankYou,
  getThankYouSuccess,
  getThankYouFailure,
  getThankYouIdle
} from "../actions";

const status = handleActions(
  {
    [getThankYouSuccess]: () => "SUCCESS",
    [getThankYou]: () => "LOADING",
    [getThankYouFailure]: () => "FAILURE",
    [getThankYouIdle]: () => "IDLE"
  },
  "IDLE"
);

const items = handleActions(
  {
    [getThankYouSuccess]: (state, action) => {
      return action.payload;
    }
  },
  []
);

const thankYou = combineReducers({
  status,
  items
});
export { thankYou };
