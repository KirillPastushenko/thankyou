import { JSOM, Helpers } from "../../../api/jsom";
import CamlBuilder from "camljs";
import { thankYouList } from "../../../constants/config";
const jsom = JSOM();
const helper = Helpers();
const { lists } = jsom;
const rowLimit = 10;
let viewFields = ["ID", "Created", "AppScores"];

export const getWeekThanksRequest = payload => {
  return new Promise((resolve, reject) => {
    const camlBuilder = new CamlBuilder();
    const caml = camlBuilder
      .View(viewFields)
      .Scope(CamlBuilder.ViewScope.RecursiveAll)
      .RowLimit(rowLimit)
      .Query()
      .Where()
      .LookupField("AppFrom")
      .Id()
      .EqualTo(payload.userListId)
      .And()
      .DateTimeField("Created")
      .GreaterThanOrEqualTo(payload.monday)
      .ToString();
    lists.getItems(thankYouList, caml).then(data => {
      const result = helper.enumerator(data.targetListItems);
      resolve(result);
    });
  });
};
