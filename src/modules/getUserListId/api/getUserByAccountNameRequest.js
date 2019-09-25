import { JSOM } from "../../../api/jsom";

const jsom = JSOM();
const { users } = jsom;
export const getUserByAccountNameRequest = acountName => {
  return new Promise((resolve, reject) => {
    users.get([acountName]).then(data => {
      data = data[0].get_data();
      const userData = data[0].get_fieldValues();
      resolve({ userId: userData.ID, title: userData.Title });
    });
  });
};
