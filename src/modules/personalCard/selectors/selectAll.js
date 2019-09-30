import { createSelector } from "reselect";
import { getAll } from "./getAll";

export const selectAll = createSelector(
  [getAll],
  items => {
    let retObj = {};
    if (Object.keys(items).length > 0) {
      Object.keys(items).map(key => {
        let counter = 0;
        items[key].map(item => {
          counter += item.AppScores;
        });
        retObj = { ...retObj, [key]: counter };
      });
    }
    return retObj;
  }
);
