import { fork } from "redux-saga/effects";
import { addThankYouWatcher } from "./addThankYou";

// MODULES
import { peopleWatcher } from "../modules/peoplePicker";
import { usersWatcher } from "../modules/getUserListId";
import { selectWatcher } from "../modules/select";
import { getThankYouWatcher } from "../modules/thankYouList";
import { userInfoWatcher } from "../modules/userInfo";
import { getThanksWatcher } from "../modules/personalCard";
import { awardsWatcher } from "../modules/personalCardAwards";
import { whoWatcher } from "../modules/who";
import { whomWatcher } from "../modules/whom";
import { likeWatcher } from "../modules/likes";

export default function*() {
  yield fork(addThankYouWatcher);

  //MODULES
  yield fork(peopleWatcher);
  yield fork(usersWatcher);
  yield fork(selectWatcher);
  yield fork(getThankYouWatcher);
  yield fork(userInfoWatcher);
  yield fork(getThanksWatcher);
  yield fork(awardsWatcher);
  yield fork(whoWatcher);
  yield fork(whomWatcher);
  yield fork(likeWatcher);
}
