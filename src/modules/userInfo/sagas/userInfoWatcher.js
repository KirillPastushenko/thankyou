import { call, takeEvery, put } from "redux-saga/effects";
import {
  getUsersInfo,
  getUsersInfoSuccess,
  getUsersInfodFailure
} from "../actions";
import { getUsersInfoRequest } from "../api";

function* getUserSaga(action) {
  const payload = action.payload;
  try {
    const users = yield call(getUsersInfoRequest, payload);
    let objToReturn = {};
    users.map(user => {
      const data = user.get_data();
      const userObj = data[0].get_fieldValues();
      objToReturn = { ...objToReturn, [userObj.ID]: userObj };
    });
    yield put(getUsersInfoSuccess(objToReturn));
  } catch (error) {
    console.log(error);
    yield put(getUsersInfodFailure(error));
  }
}

export function* userInfoWatcher() {
  yield takeEvery(getUsersInfo.toString(), getUserSaga);
}
