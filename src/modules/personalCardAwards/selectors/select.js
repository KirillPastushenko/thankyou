import { createSelector } from "reselect";

const getAwards = state => state.modules.awards.items;

export const selectAwards = createSelector(
  [getAwards],
  items => {
    let retObj = {};
    Object.keys(items).map(key => {
      retObj[key] = items[key].map(item => {
        return {
          title: item.AppBadge.get_lookupValue(),
          image: item.AppBadgeImage.get_lookupValue(),
          key: item.ID
        };
      });
    });
    return retObj;
  }
);
