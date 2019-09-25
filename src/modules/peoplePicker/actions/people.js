import { createActions } from "redux-actions";

const {
  searchPeople,
  searchPeopleSuccess,
  searchPeopleFailure,
  searchPeopleIdle
} = createActions(
  "SEARCH_PEOPLE",
  "SEARCH_PEOPLE_SUCCESS",
  "SEARCH_PEOPLE_FAILURE",
  "SEARCH_PEOPLE_IDLE"
);

export { searchPeople, searchPeopleSuccess, searchPeopleFailure, searchPeopleIdle };
