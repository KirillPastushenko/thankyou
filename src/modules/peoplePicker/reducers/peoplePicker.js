import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  searchPeople,
  searchPeopleSuccess,
  searchPeopleFailure,
  searchPeopleIdle
} from "../actions";

const people = handleActions(
  {
    [searchPeopleSuccess]: (state, action) => action.payload.result,
    [searchPeopleIdle]: () => []
  },
  []
);
const status = handleActions(
  {
    [searchPeopleSuccess]: (state, action) => "SUCCESS",
    [searchPeople]: (state, action) => "LOADING",
    [searchPeopleFailure]: (state, action) => "FAILURE",
    [searchPeopleIdle]: (state, action) => "IDLE"
  },
  "IDLE"
);
const keyword = handleActions(
  {
    [searchPeople]: (state, action) => action.payload
  },
  ""
);

const peoplePicker = combineReducers({
  people,
  status,
  keyword
});
export { peoplePicker };
