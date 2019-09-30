import { call, takeEvery, put } from "redux-saga/effects";
import {
  getAllThanks,
  getAllThanksFailure,
  getAllThanksSuccess,
  getWeekThanks,
  getWeekThanksFailure,
  getWeekThanksSuccess
} from "../actions";
import { getAllThanksRequest, getWeekThanksRequest } from "../api";

function* getAllThanksSaga(action) {
  try {
    const { payload } = action;
    const response = yield call(getAllThanksRequest, payload);
    yield put(getAllThanksSuccess({ [payload]: response }));
  } catch (error) {
    console.log(error);
    yield put(getAllThanksFailure(error));
  }
}

function* getWeekThanksSaga(action) {
  try {
    const { payload } = action;
    const response = yield call(getWeekThanksRequest, payload);
    yield put(getWeekThanksSuccess({ [payload.userListId]: response }));
  } catch (error) {
    console.log(error);
    yield put(getWeekThanksFailure(error));
  }
}

export function* getThanksWatcher() {
  yield takeEvery(getAllThanks.toString(), getAllThanksSaga);
  yield takeEvery(getWeekThanks.toString(), getWeekThanksSaga);
}
