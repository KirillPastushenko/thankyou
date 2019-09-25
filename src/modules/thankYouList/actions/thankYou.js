import { createActions } from "redux-actions";

const { getThankYou, getThankYouSuccess, getThankYouFailure } = createActions(
  "GET_THANK_YOU",
  "GET_THANK_YOU_SUCCESS",
  "GET_THANK_YOU_FAILURE"
);

export { getThankYou, getThankYouSuccess, getThankYouFailure };
