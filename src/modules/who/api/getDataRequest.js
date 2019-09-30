import { JSOM, Helpers } from "../../../api/jsom";
import CamlBuilder from "camljs";
const jsom = JSOM();
const helper = Helpers();
const { lists } = jsom;
const rowLimit = 5;
let viewFields = ["ID", "Title", "AppUser", "AppUserId", "AppFromCount"];

export const getDataRequest = payload => {
  return new Promise((resolve, reject) => {
    const camlBuilder = new CamlBuilder();
    console.log("WHO");
    const caml = camlBuilder
      .View(viewFields)
      .Scope(CamlBuilder.ViewScope.RecursiveAll)
      .RowLimit(rowLimit)
      .Query()
      .OrderByDesc("AppFromCount")
      .ToString();
    lists.getItems("AppUsers", caml).then(data => {
      const result = helper.enumerator(data.targetListItems);
      console.log("WHO:", result);
      resolve(result);
    });
  });
};
