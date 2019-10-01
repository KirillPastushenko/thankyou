import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  setLike,
  setLikeSuccess,
  setLikeFailure,
  setLikeIdle
} from "../actions";

const status = handleActions(
  {
    [setLikeSuccess]: () => "SUCCESS",
    [setLike]: () => "LOADING",
    [setLikeFailure]: () => "FAILURE",
    [setLikeIdle]: () => "IDLE"
  },
  "IDLE"
);

const like = combineReducers({
  status
});
export { like };
