import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  getUsersInfo,
  getUsersInfoSuccess,
  getUsersInfodFailure,
  getUsersInfoIdle,
  addUsersToRequest,
  setCurrentUserInfo
} from "../actions";

const info = handleActions(
  {
    [getUsersInfoSuccess]: (state, action) => {
      return { ...state, ...action.payload };
    },
    [addUsersToRequest]: (state, action) => {
      let objectToReturn = {};
      if (action.payload.length > 0) {
        action.payload.map(item => {
          let check = false;
          Object.keys(state).map(key => {
            if (parseInt(key) === parseInt(item)) {
              check = true;
            }
          });
          if (!check) {
            objectToReturn = { ...objectToReturn, [item]: null };
          }
        });
      }
      return { ...state, ...objectToReturn };
    }
  },
  {}
);
const currentUser = handleActions(
  {
    [setCurrentUserInfo]: (state, action) => {
      return { ...state, ...action.payload };
    },
    [getUsersInfoSuccess]: (state, action) => {
      if (parseInt(state.userId) === parseInt(Object.keys(action.payload)[0])) {
        return { ...state, info: action.payload[state.userId] };
      } else {
        return state;
      }
    }
  },
  {}
);
const status = handleActions(
  {
    [getUsersInfoSuccess]: (state, action) => "SUCCESS",
    [getUsersInfo]: (state, action) => "LOADING",
    [getUsersInfodFailure]: (state, action) => "FAILURE",
    [getUsersInfoIdle]: (state, action) => "IDLE"
  },
  "IDLE"
);

const usersInfo = combineReducers({
  status,
  info,
  currentUser
});

export { usersInfo };
