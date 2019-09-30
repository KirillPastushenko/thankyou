import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  getUserListId,
  getUserListIdSuccess,
  getUserListIdFailure,
  getUserListIdIdle,
  setUserIdToList
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
const idToList = handleActions(
  {
    [setUserIdToList]: (state, action) => {
      return { ...state, ...action.payload };
    }
  },
  {}
);
const status = handleActions(
  {
    [getUserListIdSuccess]: () => "SUCCESS",
    [getUserListId]: () => "LOADING",
    [getUserListIdFailure]: () => "FAILURE",
    [getUserListIdIdle]: () => "IDLE"
  },
  "IDLE"
);

const users = combineReducers({
  status,
  idToList,
  list
});

export { users };
