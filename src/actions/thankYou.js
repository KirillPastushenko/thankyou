import { createActions } from "redux-actions";

const {
  addThankYou,
  addThankYouSuccess,
  addThankYouFailure,
  addThankYouIdle
} = createActions(
  "ADD_THANK_YOU",
  "ADD_THANK_YOU_SUCCESS",
  "ADD_THANK_YOU_FAILURE",
  "ADD_THANK_YOU_IDLE",
  "GET_THANK_YOU",
  "GET_THANK_YOU_SUCCESS",
  "GET_THANK_YOU_FAILURE"
);

export { addThankYou, addThankYouSuccess, addThankYouFailure, addThankYouIdle };
