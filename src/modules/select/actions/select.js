import { createActions } from "redux-actions";

const {
  getSelectData,
  getSelectDataSuccess,
  getSelectDataFailure,
  getSelectDataIdle
} = createActions(
  "GET_SELECT_DATA",
  "GET_SELECT_DATA_SUCCESS",
  "GET_SELECT_DATA_FAILURE",
  "GET_SELECT_DATA_IDLE"
);

export {
  getSelectData,
  getSelectDataSuccess,
  getSelectDataFailure,
  getSelectDataIdle
};
