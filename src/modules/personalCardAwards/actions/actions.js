import { createActions } from "redux-actions";

const {
  getAwards,
  getAwardsSuccess,
  getAwardsFailure,
  getAwardsIdle
} = createActions(
  "GET_AWARDS",
  "GET_AWARDS_SUCCESS",
  "GET_AWARDS_FAILURE",
  "GET_AWARDS_IDLE"
);

export { getAwards, getAwardsSuccess, getAwardsFailure, getAwardsIdle };
