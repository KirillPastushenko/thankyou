import { createSelector } from "reselect";

const getWhom = state => state.modules.whom.items;

export const selectWhom = createSelector(
  [getWhom],
  items => {
    const retArr = items.map(item => {
      return {
        title: item.Title,
        userId: item.AppUserId,
        rating: item.AppToCount && item.AppToCount.get_lookupId(),
        key: item.ID,
        id: item.ID
      };
    });
    return retArr;
  }
);
