import { fork } from "redux-saga/effects";
import { userWatcher } from "./user";
import { phoneBookWatcher } from "./phonebook";
import { addThankYouWatcher } from "./addThankYou";

import { peopleWatcher } from "../modules/peoplePicker";
import { usersWatcher } from "../modules/getUserListId";
import { selectWatcher } from "../modules/select";
import { getThankYouWatcher } from "../modules/thankYouList";

export default function*() {
  yield fork(addThankYouWatcher);
  yield fork(userWatcher);
  yield fork(phoneBookWatcher);
  yield fork(peopleWatcher);
  yield fork(usersWatcher);
  yield fork(selectWatcher);
  yield fork(getThankYouWatcher);
}
