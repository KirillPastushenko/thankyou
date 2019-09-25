import { createActions } from "redux-actions";

const {
  getUserListId,
  getUserListIdSuccess,
  getUserListIdFailure,
  getUserListIdIdle
} = createActions(
  "GET_USER_LIST_ID",
  "GET_USER_LIST_ID_SUCCESS",
  "GET_USER_LIST_ID_FAILURE",
  "GET_USER_LIST_ID_IDLE"
);

export {
  getUserListId,
  getUserListIdSuccess,
  getUserListIdFailure,
  getUserListIdIdle
};
