import { call, takeEvery, put } from "redux-saga/effects";
import { addThankYouRequest } from "../api/requests";
import {
  addThankYou,
  addThankYouSuccess,
  addThankYouFailure
} from "../actions";
import { getThankYou } from "../modules/thankYouList/actions";

function* addThankYouSaga(action) {
  try {
    const { payload } = action;
    const response = yield call(addThankYouRequest, payload);

    yield put(addThankYouSuccess(response));
    yield put(getThankYou());
  } catch (error) {
    console.log(error);
    yield put(addThankYouFailure(error));
  }
}

export function* addThankYouWatcher() {
  yield takeEvery(addThankYou.toString(), addThankYouSaga);
}
