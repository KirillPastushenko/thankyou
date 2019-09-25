import { createActions } from "redux-actions";

const {
  getUser,
  getUserSuccess,
  getUserFailure
} = createActions(
  "GET_USER",
  "GET_USER_SUCCESS",
  "GET_USER_FAILURE"
);

export {
  getUser,
  getUserSuccess,
  getUserFailure
};
