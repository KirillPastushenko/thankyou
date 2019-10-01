import { JSOM } from "../../../api/jsom";
const jsom = JSOM();
const { lists } = jsom;

export const getDataRequest = payload => {
  return new Promise((resolve, reject) => {
    const { listId, itemId, setLike } = payload;
    lists.setLike(listId, itemId, setLike).then(data => {
      resolve({ listId, itemId, setLike });
    });
  });
};
