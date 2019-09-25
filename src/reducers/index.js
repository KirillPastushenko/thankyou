import { combineReducers } from "redux";
import { user } from "./user";
import { phonebook } from "./phonebook";
import { status } from "./status";
import { search } from "./search";

import { peoplePicker } from "../modules/peoplePicker";
import { users } from "../modules/getUserListId";
import { select } from "../modules/select";
import { thankYou } from "../modules/thankYouList";

const modules = combineReducers({
  peoplePicker,
  users,
  select,
  thankYou
});

export default combineReducers({
  user,
  phonebook,
  status,
  search,
  modules
});
