import { createSelector } from "reselect";

const getThankYou = state => state.modules.thankYou.items;

export const selectThankYou = createSelector(
  [getThankYou],
  items => {
    const retItems = items.map(item => {
      return {
        id: item.ID,
        title: item.Title,
        from: item.AppFrom.get_lookupValue(),
        fromId: item.AppFrom.get_lookupId(),
        to: item.AppTo.get_lookupValue(),
        toId: item.AppTo.get_lookupId(),
        scores: item.AppScores,
        text: item.AppText,
        nomination: item.AppNomination.get_lookupValue(),
        key: item.ID
      };
    });
    return retItems;
  }
);
