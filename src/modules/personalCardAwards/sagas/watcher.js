import { call, takeEvery, put } from "redux-saga/effects";
import { getAwards, getAwardsSuccess, getAwardsFailure } from "../actions";
import { getDataRequest } from "../api";

function* saga(action) {
  try {
    const { payload } = action;
    const response = yield call(getDataRequest, payload);
    yield put(getAwardsSuccess({ [payload]: response }));
  } catch (error) {
    console.log(error);
    yield put(getAwardsFailure(error));
  }
}

export function* awardsWatcher() {
  yield takeEvery(getAwards.toString(), saga);
}
