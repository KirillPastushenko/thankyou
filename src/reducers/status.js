import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  getPhoneBook,
  getPhoneBookFailure,
  getPhoneBookSuccess,
  getUser,
  getUserFailure,
  getUserSuccess,
  searchPhoneBook,
  searchPhoneBookSuccess,
  searchPhoneBookFailure
} from "../actions";

const phoneBookStatus = handleActions(
  {
    [getPhoneBook]: () => "LOADING",
    [getPhoneBookSuccess]: () => "SUCCESS",
    [getPhoneBookFailure]: () => "FAILURE"
  },
  "IDLE"
);
const searchPhoneBookStatus = handleActions(
    {
      [searchPhoneBook]: () => "LOADING",
      [searchPhoneBookSuccess]: () => "SUCCESS",
      [searchPhoneBookFailure]: () => "FAILURE"
    },
    "IDLE"
  );
const userStatus = handleActions(
  {
    [getUser]: () => "LOADING",
    [getUserSuccess]: () => "SUCCESS",
    [getUserFailure]: () => "FAILURE"
  },
  "IDLE"
);

const status = combineReducers({
  phoneBookStatus,
  searchPhoneBookStatus,
  userStatus
});
export { status };
