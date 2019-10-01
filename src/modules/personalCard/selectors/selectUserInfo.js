import { createSelector } from "reselect";

const getUserInfo = state => state.modules.usersInfo.info;

export const selectUserInfo = createSelector(
  [getUserInfo],
  items => {
    let retObj = {};
    Object.keys(items).map(key => {
      const item = items[key];
      if (item) {
        retObj = {
          ...retObj,
          [key]: {
            title: item.Title,
            jobTitle: item.JobTitle,
            office: item.Office,
            picture: item.Picture && item.Picture.get_url(),
            email: item.EMail
          }
        };
      }
    });
    return retObj;
  }
);
