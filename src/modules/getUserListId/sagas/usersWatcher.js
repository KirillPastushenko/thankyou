import { call, takeEvery, put } from "redux-saga/effects";
import {
  getUserListId,
  getUserListIdSuccess,
  getUserListIdFailure,
  setUserIdToList
} from "../actions";
import { setCurrentUserInfo, addUsersToRequest } from "../../userInfo/actions";
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
      // userId = 5698;
      title = curUser.title;
      yield put(setCurrentUserInfo({ userId }));
      yield put(addUsersToRequest([userId]));
    } else {
      if (!parseInt(payload)) {
        const user = yield call(getUserByAccountNameRequest, payload);
        userId = user.userId;
        title = user.title;
      } else {
        userId = parseInt(payload); 
      }
    }
    let userListId = yield call(getListItemByUserIdRequest, userId);
    if (!userListId) {
      userListId = yield call(addListItemByUserRequest, { userId, title });
    }
    if (!payload) {
      yield put(setCurrentUserInfo({ userListId, title }));
    }
    yield put(setUserIdToList({ [userId]: userListId }));
    if (title) {
      yield put(getUserListIdSuccess({ to: payload, id: userListId, title }));
    }
  } catch (error) {
    console.log(error);
    yield put(getUserListIdFailure(error));
  }
}

export function* usersWatcher() {
  yield takeEvery(getUserListId.toString(), getUserSaga);
}
