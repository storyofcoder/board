import Constants from "./Constants";

export const updateList = data => ({
  type: Constants.UPDATE_LIST,
  payload: data
});

export const updateView = data => ({
  type: Constants.UPDATE_VIEW,
  payload: data
});

export const handleSearch = data => ({
  type: Constants.HANDLE_SEARCH,
  payload: data
});