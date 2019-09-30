import { createActions } from "redux-actions";

const {
  getUsersInfo,
  getUsersInfoSuccess,
  getUsersInfodFailure,
  getUsersInfoIdle,
  addUsersToRequest
} = createActions(
  "GET_USERS_INFO",
  "GET_USERS_INFO_SUCCESS",
  "GET_USERS_INFO_FAILURE",
  "GET_USERS_INFO_IDLE",
  "ADD_USERS_TO_REQUEST"
);

const { setCurrentUserInfo } = createActions("SET_CURRENT_USER_INFO");

export {
  getUsersInfo,
  getUsersInfoSuccess,
  getUsersInfodFailure,
  getUsersInfoIdle,
  addUsersToRequest,
  setCurrentUserInfo
};
