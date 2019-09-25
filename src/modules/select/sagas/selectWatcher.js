import { call, takeEvery, put } from "redux-saga/effects";
import {
  getSelectData,
  getSelectDataSuccess,
  getSelectDataFailure
} from "../actions";
import { getSelectDataRequest } from "../api";

function* selectSaga(action) {
  try {
    const response = yield call(getSelectDataRequest, action);
    yield put(getSelectDataSuccess(response));
  } catch (error) {
    console.log(error);
    yield put(getSelectDataFailure(error));
  }
}

export function* selectWatcher() {
  yield takeEvery(getSelectData.toString(), selectSaga);
}
