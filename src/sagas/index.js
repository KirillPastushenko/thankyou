import { fork } from "redux-saga/effects";
import { userWatcher } from "./user";
import { phoneBookWatcher } from "./phonebook";
import { addThankYouWatcher } from "./addThankYou";

// MODULES
import { peopleWatcher } from "../modules/peoplePicker";
import { usersWatcher } from "../modules/getUserListId";
import { selectWatcher } from "../modules/select";
import { getThankYouWatcher } from "../modules/thankYouList";
import { userInfoWatcher } from "../modules/userInfo";
import { getThanksWatcher } from "../modules/personalCard";
import { awardsWatcher } from "../modules/personalCardAwards";

export default function*() {
  yield fork(addThankYouWatcher);
  yield fork(userWatcher);
  yield fork(phoneBookWatcher);

  //MODULES
  yield fork(peopleWatcher);
  yield fork(usersWatcher);
  yield fork(selectWatcher);
  yield fork(getThankYouWatcher);
  yield fork(userInfoWatcher);
  yield fork(getThanksWatcher);
  yield fork(awardsWatcher);
}
