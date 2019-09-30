import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  getAwards,
  getAwardsSuccess,
  getAwardsFailure,
  getAwardsIdle
} from "../actions";

const status = handleActions(
  {
    [getAwardsSuccess]: (state, action) => "SUCCESS",
    [getAwards]: (state, action) => "LOADING",
    [getAwardsFailure]: (state, action) => "FAILURE",
    [getAwardsIdle]: (state, action) => "IDLE"
  },
  "IDLE"
);

const items = handleActions(
  {
    [getAwardsSuccess]: (state, action) => {
      return { ...state, ...action.payload };
    }
  },
  {}
);

const awards = combineReducers({
  status,
  items
});
export { awards };
