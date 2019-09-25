import { call, takeEvery, put } from "redux-saga/effects";
import {
  getThankYou,
  getThankYouSuccess,
  getThankYouFailure
} from "../actions";
import { getThankYouRequest } from "../api";

function* getThankYouSaga(action) {
  try {
    const { payload } = action;
    const response = yield call(getThankYouRequest, payload);
    yield put(getThankYouSuccess(response));
  } catch (error) {
    console.log(error);
    yield put(getThankYouFailure(error));
  }
}

export function* getThankYouWatcher() {
  yield takeEvery(getThankYou.toString(), getThankYouSaga);
}
