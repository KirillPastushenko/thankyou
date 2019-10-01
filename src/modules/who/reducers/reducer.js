import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import { getWho, getWhoSuccess, getWhoIdle, getWhoFailure } from "../actions";

const status = handleActions(
  {
    [getWhoSuccess]: () => "SUCCESS",
    [getWho]: () => "LOADING",
    [getWhoFailure]: () => "FAILURE",
    [getWhoIdle]: () => "IDLE"
  },
  "IDLE"
);

const items = handleActions(
  {
    [getWhoSuccess]: (state, action) => {
      return action.payload;
    }
  },
  []
);

const who = combineReducers({
  status,
  items
});
export { who };
