import { JSOM } from "../jsom";
import { phoneBookContentTypeId, tableRowLimit } from "../../constants/config";
import { columns } from "../../constants/columns";
const jsom = JSOM();
const { search } = jsom;

let viewFields = [];
columns.map(column => {
  viewFields = [...viewFields, column.searchKey];
});
viewFields = [...viewFields, "ListItemID", "Created"];
let startRow;
export const searchPhoneBookRequest = action => {
  return new Promise((resolve, reject) => {
    const { payload } = action;
    let request;
    if (payload) {
      request = payload.request;
      startRow = payload.position;
    }
    if (!startRow) startRow = 0;
    search
      .text(
        request,
        //[phoneBookContentTypeId],
        null,
        viewFields,
        tableRowLimit,
        startRow
      )
      .then(data => {
        const result = data.m_value.ResultTables[0].ResultRows;
        const nextPage = startRow + tableRowLimit;
        let prevPage = startRow - tableRowLimit;
        if (prevPage < 1) prevPage = 0;
        const count = data.m_value.ResultTables[0].TotalRows;
        resolve({ result, count, nextPage, prevPage });
      });
  });
};
