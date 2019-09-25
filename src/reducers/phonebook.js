import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  getPhoneBookSuccess,
  getPhoneBook
} from "../actions";

const items = handleActions(
  {
    [getPhoneBookSuccess]: (state, action) => action.payload.result
  },
  []
);
const itemsCount = handleActions(
  {
    [getPhoneBookSuccess]: (state, action) => action.payload.count
  },
  0
);
const nextPage = handleActions(
  {
    [getPhoneBookSuccess]: (state, action) => action.payload.nextPage
  },
  0
);
const prevPage = handleActions(
  {
    [getPhoneBookSuccess]: (state, action) => action.payload.prevPage
  },
  0
);
const searchKey = handleActions(
  {
    [getPhoneBook]: (state, action) => {
      if (action.payload && action.payload.request) {
        return action.payload.request;
      } else {
        return "";
      }
    }
  },
  ""
);
const current = handleActions(
  {
    [getPhoneBook]: (state, action) => {
      if (!action.payload || !action.payload.position) {
        return 1;
      } else if (action.payload && action.payload.position && action.payload.next) {
        return state + 1;
      } else if (action.payload && action.payload.position && action.payload.prev) {
        return state - 1;
      } else {
        return 1;
      }
    }
  },
  1
);

const phonebook = combineReducers({
  items,
  itemsCount,
  nextPage,
  prevPage,
  searchKey,
  current
});
export { phonebook };
