import { call, takeEvery, put } from "redux-saga/effects";
import { getWho, getWhoSuccess, getWhoFailure } from "../actions";
import { getDataRequest } from "../api";

function* saga(action) {
  try {
    const { payload } = action;
    const response = yield call(getDataRequest, payload);
    yield put(getWhoSuccess(response));
  } catch (error) {
    console.log(error);
    yield put(getWhoFailure(error));
  }
}

export function* whoWatcher() {
  yield takeEvery(getWho.toString(), saga);
}
