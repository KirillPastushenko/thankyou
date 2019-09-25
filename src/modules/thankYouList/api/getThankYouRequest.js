import { JSOM, Helpers } from "../../../api/jsom";
import CamlBuilder from "camljs";
import { thankYouList } from "../../../constants/config";
const jsom = JSOM();
const helper = Helpers();
const { lists } = jsom;
const rowLimit = 10;
let viewFields = [
  "ID",
  "Title",
  "AppFrom",
  "AppFromScores",
  "AppNomination",
  "AppScores",
  "AppText",
  "AppTo"
];

export const getThankYouRequest = payload => {
  return new Promise((resolve, reject) => {
    const camlBuilder = new CamlBuilder();
    const caml = camlBuilder
      .View(viewFields)
      .LeftJoin("AppFrom", "AppUsers")
      .Select("AppScores", "AppFromScores")
      .Scope(CamlBuilder.ViewScope.RecursiveAll)
      .RowLimit(rowLimit)
      .Query()
      .ToString();
    console.log(caml);
    lists.getItems(thankYouList, caml).then(data => {
      const result = helper.enumerator(data.targetListItems);
      console.log(result);
      resolve(result);
    });
  });
};
