import { call, takeEvery, put } from "redux-saga/effects";
import {
  searchPeople,
  searchPeopleSuccess,
  searchPeopleFailure
} from "../actions";
import { searchPeopleRequest } from "../api";

function* searchPeopleSaga(action) {
  try {
    const response = yield call(searchPeopleRequest, action);
    yield put(searchPeopleSuccess(response));
  } catch (error) {
    console.log(error);
    yield put(searchPeopleFailure(error));
  }
}

export function* peopleWatcher() {
  yield takeEvery(searchPeople.toString(), searchPeopleSaga);
}
