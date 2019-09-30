import { JSOM } from "../../../api/jsom";

const jsom = JSOM();
const { users } = jsom;
export const getUsersInfoRequest = idsArr => {
  return new Promise((resolve, reject) => {
    users.get(idsArr).then(data => {
      resolve(data);
    });
  });
};
