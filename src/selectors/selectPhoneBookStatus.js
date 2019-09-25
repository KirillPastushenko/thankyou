import { createSelector } from "reselect";

const getStatus = state => {
    const searchStatus = state.status.searchPhoneBookStatus;
    const getStatus = state.status.phoneBookStatus;
    if (searchStatus === "LOADING" || getStatus === "LOADING") {
        return true;
    } else {
        return false;
    }
  
};

export const selectPhoneBookStatus = createSelector(
  [getStatus],
  status => {
    return status;
  }
);
