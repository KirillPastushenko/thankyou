import { call, takeEvery, put } from "redux-saga/effects";
import { getPhoneBookRequest, searchPhoneBookRequest } from "../api/requests";
import {
  getPhoneBook,
  getPhoneBookFailure,
  getPhoneBookSuccess
} from "../actions";

function* getPhoneBookSaga(action) {
  try {
    const request = action.payload && action.payload.request;
    let response;
    if (request && request !== "") {
      response = yield call(searchPhoneBookRequest, action);
    } else {
      response = yield call(getPhoneBookRequest, action);
    }
    yield put(getPhoneBookSuccess(response));
  } catch (error) {
    console.log(error);
    yield put(getPhoneBookFailure(error));
  }
}

export function* phoneBookWatcher() {
  yield takeEvery(getPhoneBook.toString(), getPhoneBookSaga);
}
