import { handleActions } from "redux-actions";
import { getPhoneBook } from "../actions";

const search = handleActions(
  {
    [getPhoneBook]: (state, action) => {
      if (action.payload && action.payload.search) {
        return action.payload.search;
      } else {
        return {};
      }
    }
  },
  {}
);

export { search };
