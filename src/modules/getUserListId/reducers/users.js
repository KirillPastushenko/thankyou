import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  getUserListId,
  getUserListIdSuccess,
  getUserListIdFailure,
  getUserListIdIdle
} from "../actions";

const list = handleActions(
  {
    [getUserListIdSuccess]: (state, action) => {
      if (action.payload.to) {
        return { ...state, to: action.payload };
      } else {
        return { ...state, from: action.payload };
      }
    }
  },
  {}
);
const status = handleActions(
  {
    [getUserListIdSuccess]: (state, action) => "SUCCESS",
    [getUserListId]: (state, action) => "LOADING",
    [getUserListIdFailure]: (state, action) => "FAILURE",
    [getUserListIdIdle]: (state, action) => "IDLE"
  },
  "IDLE"
);

const users = combineReducers({
  status,
  list
});

export { users };
