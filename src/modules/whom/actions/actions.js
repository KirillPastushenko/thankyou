import { createActions } from "redux-actions";

const { getWhom, getWhomSuccess, getWhomFailure, getWhomIdle } = createActions(
  "GET_WHOM",
  "GET_WHOM_SUCCESS",
  "GET_WHOM_FAILURE",
  "GET_WHOM_IDLE"
);

export { getWhom, getWhomSuccess, getWhomFailure, getWhomIdle };
