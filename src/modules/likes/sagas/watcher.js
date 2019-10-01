import { call, takeEvery, put } from "redux-saga/effects";
import { setLike, setLikeSuccess, setLikeFailure } from "../actions";
import { getDataRequest } from "../api";

function* saga(action) {
  try {
    const { payload } = action;
    yield call(getDataRequest, payload);
    yield put(setLikeSuccess());
  } catch (error) {
    console.log(error);
    yield put(setLikeFailure(error));
  }
}

export function* likeWatcher() {
  yield takeEvery(setLike.toString(), saga);
}
