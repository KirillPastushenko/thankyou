import { JSOM } from "../../../api/jsom";
import { usersList, userField, userFieldId } from "../../../constants/config";
const jsom = JSOM();
const { lists } = jsom;

export const addListItemByUserRequest = payload => {
  const { userId, title } = payload;
  const addObj = [{ [userField]: userId, Title: title, [userFieldId]: userId }];
  return new Promise((resolve, reject) => {
    lists.addItems(usersList, addObj).then(data => {
      if (data.get_id) {
        resolve(data.get_id());
      } else {
        resolve(null);
      }
    });
  });
};
