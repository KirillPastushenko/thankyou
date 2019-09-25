import { createSelector } from "reselect";

const getPeople = state => state.modules.peoplePicker.people;

export const selectPeople = createSelector(
  [getPeople],
  people => {
    const retPeople = people.map(item => {
      return {
        name: item.FirstName + " " + item.LastName,
        value: item.AccountName,
        mail: item.WorkEmail,
        key: item.WorkEmail
      };
    });
    return retPeople;
  }
);
