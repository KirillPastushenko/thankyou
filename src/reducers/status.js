import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  addThankYou,
  addThankYouSuccess,
  addThankYouFailure,
  addThankYouIdle
} from "../actions";

const addThankYouStatus = handleActions(
  {
    [addThankYou]: () => "LOADING",
    [addThankYouSuccess]: () => "SUCCESS",
    [addThankYouFailure]: () => "FAILURE",
    [addThankYouIdle]: () => "IDLE"
  },
  "IDLE"
);

const status = combineReducers({
  addThankYouStatus
});
export { status };
