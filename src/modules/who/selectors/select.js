import { createSelector } from "reselect";

const getWho = state => state.modules.who.items;

export const selectWho = createSelector(
  [getWho],
  items => {
    console.log("items", items);
    const retArr = items.map(item => {
      return {
        title: item.Title,
        userId: item.AppUserId,
        rating: item.AppFromCount.get_lookupId(),
        key: item.ID,
        id: item.ID
      };
    });
    return retArr;
  }
);
