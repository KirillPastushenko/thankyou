import { JSOM, Helpers } from "../../../api/jsom";
import CamlBuilder from "camljs";
import { usersList, userField } from "../../../constants/config";
const jsom = JSOM();
const helpers = Helpers();
const { lists } = jsom;

let viewFields = ["ID", "Title", userField];

export const getListItemByUserIdRequest = userId => {
  const camlBuilder = new CamlBuilder();
  let caml = camlBuilder
    .View(viewFields)
    .Scope(CamlBuilder.ViewScope.RecursiveAll)
    .RowLimit(1)
    .Query()
    .Where()
    .LookupField(userField)
    .Id()
    .EqualTo(userId);
  caml = caml.ToString();
  return new Promise((resolve, reject) => {
    lists.getItems(usersList, caml).then(data => {
      const { targetListItems } = data;
      const result = helpers.enumerator(targetListItems);
      if (result[0]) {
        resolve(result[0].ID);
      } else {
        resolve(null);
      }
    });
  });
};
