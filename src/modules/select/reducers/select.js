import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  getSelectData,
  getSelectDataSuccess,
  getSelectDataFailure,
  getSelectDataIdle
} from "../actions";

const status = handleActions(
  {
    [getSelectDataSuccess]: (state, action) => "SUCCESS",
    [getSelectData]: (state, action) => "LOADING",
    [getSelectDataFailure]: (state, action) => "FAILURE",
    [getSelectDataIdle]: (state, action) => "IDLE"
  },
  "IDLE"
);

const options = handleActions(
  {
    [getSelectDataSuccess]: (state, action) => {
      return { ...state, ...action.payload };
    }
  },
  {}
);

const select = combineReducers({
  status,
  options
});
export { select };
