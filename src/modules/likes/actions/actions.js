import { createActions } from "redux-actions";

const { setLike, setLikeSuccess, setLikeFailure, setLikeIdle } = createActions(
  "SET_LIKE",
  "SET_LIKE_SUCCESS",
  "SET_LIKE_FAILURE",
  "SET_LIKE_IDLE"
);

export { setLike, setLikeSuccess, setLikeFailure, setLikeIdle };
