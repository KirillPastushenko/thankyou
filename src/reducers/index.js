import { combineReducers } from "redux";
import { user } from "./user";
import { phonebook } from "./phonebook";
import { status } from "./status";
import { search } from "./search";

//MODULES
import { peoplePicker } from "../modules/peoplePicker";
import { users } from "../modules/getUserListId";
import { select } from "../modules/select";
import { thankYou } from "../modules/thankYouList";
import { usersInfo } from "../modules/userInfo";
import { thanks } from "../modules/personalCard";
import { awards } from "../modules/personalCardAwards";

const modules = combineReducers({
  peoplePicker,
  users,
  select,
  thankYou,
  usersInfo,
  thanks,
  awards
});

export default combineReducers({
  user,
  phonebook,
  status,
  search,
  modules
});
