import { createActions } from "redux-actions";

const {
  getUserListId,
  getUserListIdSuccess,
  getUserListIdFailure,
  getUserListIdIdle,
  setUserIdToList
} = createActions(
  "GET_USER_LIST_ID",
  "GET_USER_LIST_ID_SUCCESS",
  "GET_USER_LIST_ID_FAILURE",
  "GET_USER_LIST_ID_IDLE",
  "SET_USER_ID_TO_LIST"
);

export {
  getUserListId,
  getUserListIdSuccess,
  getUserListIdFailure,
  getUserListIdIdle,
  setUserIdToList
};
