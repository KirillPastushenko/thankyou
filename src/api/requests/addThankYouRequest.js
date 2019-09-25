import { JSOM } from "../jsom";
import { thankYouList } from "../../constants/config";
const jsom = JSOM();
const { lists } = jsom;

export const addThankYouRequest = payload => {
  return new Promise((resolve, reject) => {
    lists.addItems(thankYouList, [payload]).then(data => {
      resolve();
    });
  });
};
