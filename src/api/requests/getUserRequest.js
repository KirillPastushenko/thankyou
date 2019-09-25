import { JSOM } from "../jsom";

const jsom = JSOM();
const { users } = jsom;
export const getUserRequest = payload => {
  return new Promise((resolve, reject) => {
    users.getCurrent().then(data => {
      const user = data;
      window.user = data;
      const userId = data.get_id();
      users.get([userId]).then(data => {
        data = data[0].get_data();
        const userData = data[0];
        window.user2 = userData.get_fieldValues();
        let groups = user.get_groups();
        groups = groups.get_data();
        const groupsArr = [];
        groups.map(item => {
          groupsArr.push({ id: item.get_id(), title: item.get_title() });
        });
        // console.log("Groups: ", groups);
        resolve({ current: userData.get_fieldValues(), groups: groupsArr });
      });
    });
  });
};
