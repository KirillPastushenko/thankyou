import { createSelector } from "reselect";

const getOptions = state => state.modules.select.options;

export const selectOptions = createSelector(
  [getOptions],
  options => {
    let retOptions = {};
    Object.keys(options).map(key => {
      retOptions[key] = options[key].map(option => {
        return {
          label: option.Title,
          value: option.ID,
          key: option.ID
        };
      });
    });
    return retOptions;
  }
);
