import { JSOM, Helpers } from "../jsom";
import CamlBuilder from "camljs";
import { columns } from "../../constants/columns";
import { phoneBookListName, tableRowLimit } from "../../constants/config";
const jsom = JSOM();
const helpers = Helpers();
const { lists } = jsom;

let viewFields = [];
columns.map(column => {
  viewFields = [...viewFields, column.key];
});
viewFields = [...viewFields, "ID", "Created"];
const sortField = "ID";
const rowLimit = tableRowLimit;

export const getPhoneBookRequest = action => {
  const { payload } = action;
  let ID, position;
  if (payload) {
    ID = payload.ID;
    position = payload.position;
  }
  const camlBuilder = new CamlBuilder();
  let caml = camlBuilder
    .View(viewFields)
    .Scope(CamlBuilder.ViewScope.RecursiveAll)
    .RowLimit(rowLimit)
    .Query();
  if (ID) {
    caml = caml
      .Where()
      .LookupField("ID")
      .Id()
      .EqualTo(ID);
  }
  caml = caml.OrderByDesc(sortField).ToString();
  return new Promise((resolve, reject) => {
    lists.getItems(phoneBookListName, caml, position).then(data => {
      const { targetList, targetListItems } = data;
      const nextPage = helpers.nextPage(targetListItems);
      const prevPage = helpers.prevPage(targetListItems);
      const count = targetList.get_itemCount();
      const result = helpers.enumerator(targetListItems);
      resolve({ result, count, nextPage, prevPage });
    });
  });
};