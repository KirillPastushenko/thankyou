import React from "react";
import { createSelector } from "reselect";
import { columns } from "../constants/columns";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import Linkify from "react-linkify";

const getPhoneBook = state => state.phonebook.items;

const searchConvertor = phonebook => {
  let phoneBookForTable = [];
  phonebook.map(item => {
    let phoneBookObj = {};
    columns.map(column => {
      const { key, searchKey } = column;
      let value = item[column.searchKey];
      if (searchKey.indexOf("OWSDATE") > 0) {
        // value = new Date(value.replace(/Z/g, "+0300"));
        value = new Date(value);
      }
      if (key.indexOf("Phone") > -1) {
        const phoneNumber = parsePhoneNumberFromString(value, "RU");
        if (phoneNumber) {
          value = phoneNumber;
        }
      }
      if (key.indexOf("Site") > -1) {
        value = value && <Linkify>{value}</Linkify>;
      }
      phoneBookObj = { ...phoneBookObj, [key]: value };
    });
    phoneBookObj = { ...phoneBookObj, key: item.ListItemID };
    phoneBookForTable = [...phoneBookForTable, phoneBookObj];
  });
  return phoneBookForTable;
};
const listConvertor = phonebook => {
  let phoneBookForTable = [];
  phonebook.map(item => {
    let phoneBookObj = {};
    columns.map(column => {
      const { key } = column;
      let value = item[column.key];
      if (key.indexOf("Phone") > -1) {
        const phoneNumber = parsePhoneNumberFromString(value, "RU");
        if (phoneNumber) {
          value = phoneNumber;
        }
      }
      if (key.indexOf("Site") > -1) {
        value = value && <Linkify>{value}</Linkify>;
      }
      phoneBookObj = { ...phoneBookObj, [key]: value };
    });
    phoneBookObj = { ...phoneBookObj, key: item.ID };
    phoneBookForTable = [...phoneBookForTable, phoneBookObj];
  });
  return phoneBookForTable;
};

export const selectPhoneBook = createSelector(
  [getPhoneBook],
  phonebook => {
    let phoneBookForTable = [];
    if (phonebook.length > 0 && phonebook[0].Rank) {
      phoneBookForTable = searchConvertor(phonebook);
    } else {
      phoneBookForTable = listConvertor(phonebook);
    }
    return phoneBookForTable;
  }
);
