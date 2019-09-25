import { JSOM, Helpers } from "../../../api/jsom";
import CamlBuilder from "camljs";
const jsom = JSOM();
const helper = Helpers();
const { lists } = jsom;
const rowLimit = 100;
let viewFields = ["ID", "Title"];

export const getSelectDataRequest = action => {
  return new Promise((resolve, reject) => {
    const { payload } = action;
    const camlBuilder = new CamlBuilder();
    const caml = camlBuilder
      .View(viewFields)
      .Scope(CamlBuilder.ViewScope.RecursiveAll)
      .RowLimit(rowLimit)
      .Query()
      .ToString();
    lists.getItems(payload, caml).then(data => {
      const result = helper.enumerator(data.targetListItems);
      resolve({ [payload]: result });
    });
  });
};
