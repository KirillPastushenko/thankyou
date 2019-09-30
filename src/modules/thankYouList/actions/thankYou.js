import { createActions } from "redux-actions";

const {
  getThankYou,
  getThankYouSuccess,
  getThankYouFailure,
  getThankYouIdle
} = createActions(
  "GET_THANK_YOU",
  "GET_THANK_YOU_SUCCESS",
  "GET_THANK_YOU_FAILURE",
  "GET_THANK_YOU_IDLE"
);

export { getThankYou, getThankYouSuccess, getThankYouFailure, getThankYouIdle };
