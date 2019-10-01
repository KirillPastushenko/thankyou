import { JSOM, Helpers } from "../../../api/jsom";
import CamlBuilder from "camljs";
import { thankYouList } from "../../../constants/config";
const jsom = JSOM();
const helper = Helpers();
const { lists } = jsom;
const rowLimit = 50;
let viewFields = [
  "ID",
  "Title",
  "AppFrom",
  "AppFromUserId",
  "AppToUserId",
  "AppNomination",
  "AppScores",
  "AppText",
  "AppTo",
  "LikedBy",
  "LikesCount"
];

export const getThankYouRequest = payload => {
  return new Promise((resolve, reject) => {
    const camlBuilder = new CamlBuilder();
    const caml = camlBuilder
      .View(viewFields)
      .LeftJoin("AppFrom", "AppFrom")
      .Select("AppUserId", "AppFromUserId")
      .LeftJoin("AppTo", "AppTo")
      .Select("AppUserId", "AppToUserId")
      .Scope(CamlBuilder.ViewScope.RecursiveAll)
      .RowLimit(rowLimit)
      .Query()
      .OrderByDesc("ID")
      .ToString();
    lists.getItems(thankYouList, caml).then(data => {
      const result = helper.enumerator(data.targetListItems);
      resolve(result);
    });
  });
};
