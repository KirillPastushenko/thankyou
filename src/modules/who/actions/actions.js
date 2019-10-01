import { createActions } from "redux-actions";

const { getWho, getWhoSuccess, getWhoFailure, getWhoIdle } = createActions(
  "GET_WHO",
  "GET_WHO_SUCCESS",
  "GET_WHO_FAILURE",
  "GET_WHO_IDLE"
);

export { getWho, getWhoSuccess, getWhoFailure, getWhoIdle };
