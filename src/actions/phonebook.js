import { createActions } from "redux-actions";

const {
  getPhoneBook,
  getPhoneBookSuccess,
  getPhoneBookFailure,
  searchPhoneBook,
  searchPhoneBookSuccess,
  searchPhoneBookFailure
} = createActions(
  "GET_PHONE_BOOK",
  "GET_PHONE_BOOK_SUCCESS",
  "GET_PHONE_BOOK_FAILURE",
  "SEARCH_PHONE_BOOK",
  "SEARCH_PHONE_BOOK_SUCCESS",
  "SEARCH_PHONE_BOOK_FAILURE"
);

export {
  getPhoneBook,
  getPhoneBookSuccess,
  getPhoneBookFailure,
  searchPhoneBook,
  searchPhoneBookSuccess,
  searchPhoneBookFailure
};
