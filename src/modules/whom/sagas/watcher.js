import { call, takeEvery, put } from "redux-saga/effects";
import { getWhom, getWhomSuccess, getWhomFailure } from "../actions";
import { getDataRequest } from "../api";

function* saga(action) {
  try {
    const { payload } = action;
    const response = yield call(getDataRequest, payload);
    yield put(getWhomSuccess(response));
  } catch (error) {
    console.log(error);
    yield put(getWhomFailure(error));
  }
}

export function* whomWatcher() {
  yield takeEvery(getWhom.toString(), saga);
}
