import { JSOM } from "../../../api/jsom";
const jsom = JSOM();
const { search } = jsom;

export const searchPeopleRequest = action => {
  return new Promise((resolve, reject) => {
    const { payload } = action;
    let request = "";
    if (payload) {
      request = payload;
    }
    search.mentionSearch(request).then(data => {
      const result = data.m_value.ResultTables[0].ResultRows;
      const count = data.m_value.ResultTables[0].TotalRows;
      resolve({ result, count });
    });
  });
};
