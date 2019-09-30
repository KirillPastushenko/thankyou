import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  getWhom,
  getWhomSuccess,
  getWhomIdle,
  getWhomFailure
} from "../actions";

const status = handleActions(
  {
    [getWhomSuccess]: () => "SUCCESS",
    [getWhom]: () => "LOADING",
    [getWhomFailure]: () => "FAILURE",
    [getWhomIdle]: () => "IDLE"
  },
  "IDLE"
);

const items = handleActions(
  {
    [getWhomSuccess]: (state, action) => {
      return action.payload;
    }
  },
  []
);

const whom = combineReducers({
  status,
  items
});
export { whom };
