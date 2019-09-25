import { JSOM } from "../../../api/jsom";

const jsom = JSOM();
const { users } = jsom;
export const getCurrentRequest = payload => {
  return new Promise((resolve, reject) => {
    users.getCurrent().then(data => {
      const userId = data.get_id();
      const title = data.get_title();
      resolve({ userId, title });
    });
  });
};
