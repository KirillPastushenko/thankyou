import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  getThankYou,
  getThankYouSuccess,
  getThankYouFailure
} from "../actions";

const status = handleActions(
  {
    [getThankYouSuccess]: (state, action) => "SUCCESS",
    [getThankYou]: (state, action) => "LOADING",
    [getThankYouFailure]: (state, action) => "FAILURE"
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
