import { createSelector } from "reselect";
import { getAll } from "./getAll";
import moment from "moment";

export const selectMonth = createSelector(
  [getAll],
  items => {
    let retObj = {};
    if (Object.keys(items).length > 0) {
      Object.keys(items).map(key => {
        let counter = 0;
        items[key].map(item => {
          const created = moment(item.Created).format("YYYYMM");
          const now = moment().format("YYYYMM");
          if (created === now) {
            counter += item.AppScores;
          }
        });
        retObj = { ...retObj, [key]: counter };
      });
    }
    return retObj;
  }
);
