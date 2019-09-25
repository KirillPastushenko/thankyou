import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import { getUserSuccess } from "../actions";

const current = handleActions(
  {
    [getUserSuccess]: (state, action) => action.payload.current
  },
  {}
);
const groups = handleActions(
  {
    [getUserSuccess]: (state, action) => action.payload.groups
  },
  []
);


const user = combineReducers({
  current,
  groups,
});
export { user };