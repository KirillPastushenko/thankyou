import { JSOM, Helpers } from "../../../api/jsom";
import CamlBuilder from "camljs";
const jsom = JSOM();
const helper = Helpers();
const { lists } = jsom;
const rowLimit = 100;
let viewFields = ["ID", "Title", "AppBadge", "AppBadgeImage"];

export const getDataRequest = payload => {
  return new Promise((resolve, reject) => {
    const camlBuilder = new CamlBuilder();
    const caml = camlBuilder
      .View(viewFields)
      .LeftJoin("AppBadge", "AppBadge")
      .Select("AppImageText", "AppBadgeImage")
      .Scope(CamlBuilder.ViewScope.RecursiveAll)
      .RowLimit(rowLimit)
      .Query()
      .Where()
      .LookupField("AppTo")
      .Id()
      .EqualTo(payload)
      .ToString();
    lists.getItems("AppBadgesToUsers", caml).then(data => {
      const result = helper.enumerator(data.targetListItems);
      resolve(result);
    });
  });
};
