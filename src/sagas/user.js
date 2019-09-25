import { call, takeEvery, put } from "redux-saga/effects";
import { getUserRequest } from "../api/requests";
import { getUser, getUserSuccess, getUserFailure } from "../actions";

function* getUserSaga(action) {
  try {
    const response = yield call(getUserRequest, action);
    yield put(getUserSuccess(response));
  } catch (error) {
    console.log(error);
    yield put(getUserFailure(error));
  }
}

export function* userWatcher() {
  yield takeEvery(getUser.toString(), getUserSaga);
}
