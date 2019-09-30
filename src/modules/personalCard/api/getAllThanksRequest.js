import { JSOM, Helpers } from "../../../api/jsom";
import CamlBuilder from "camljs";
import { thankYouList } from "../../../constants/config";
const jsom = JSOM();
const helper = Helpers();
const { lists } = jsom;
const rowLimit = 1000;
let viewFields = ["ID", "Created", "AppScores"];

export const getAllThanksRequest = payload => {
  return new Promise((resolve, reject) => {
    const camlBuilder = new CamlBuilder();
    const caml = camlBuilder
      .View(viewFields)
      .Scope(CamlBuilder.ViewScope.RecursiveAll)
      .RowLimit(rowLimit)
      .Query()
      .Where()
      .LookupField("AppTo")
      .Id()
      .EqualTo(payload)
      .ToString();
    lists.getItems(thankYouList, caml).then(data => {
      const result = helper.enumerator(data.targetListItems);
      resolve(result);
    });
  });
};
