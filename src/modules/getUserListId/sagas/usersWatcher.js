import { call, takeEvery, put } from "redux-saga/effects";
import {
  getUserListId,
  getUserListIdSuccess,
  getUserListIdFailure
} from "../actions";
import {
  getUserByAccountNameRequest,
  getCurrentRequest,
  getListItemByUserIdRequest,
  addListItemByUserRequest
} from "../api";

function* getUserSaga(action) {
  const payload = action.payload;
  try {
    let userId;
    let title;
    if (!payload) {
      const curUser = yield call(getCurrentRequest);
      userId = curUser.userId;
      title = curUser.title;
    } else {
      const user = yield call(getUserByAccountNameRequest, payload);
      userId = user.userId;
      title = user.title;
    }
    let userListId = yield call(getListItemByUserIdRequest, userId);
    if (!userListId) {
      userListId = yield call(addListItemByUserRequest, { userId, title });
    }
    yield put(getUserListIdSuccess({ to: payload, id: userListId, title }));
  } catch (error) {
    console.log(error);
    yield put(getUserListIdFailure(error));
  }
}

export function* usersWatcher() {
  yield takeEvery(getUserListId.toString(), getUserSaga);
}
