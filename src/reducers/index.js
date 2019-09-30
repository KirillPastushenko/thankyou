import { combineReducers } from "redux";
import { status } from "./status";

//MODULES
import { peoplePicker } from "../modules/peoplePicker";
import { users } from "../modules/getUserListId";
import { select } from "../modules/select";
import { thankYou } from "../modules/thankYouList";
import { usersInfo } from "../modules/userInfo";
import { thanks } from "../modules/personalCard";
import { awards } from "../modules/personalCardAwards";
import { who } from "../modules/who";
import { whom } from "../modules/whom";

const modules = combineReducers({
  peoplePicker,
  users,
  select,
  thankYou,
  usersInfo,
  thanks,
  awards,
  who,
  whom
});

export default combineReducers({
  status,
  modules
});
