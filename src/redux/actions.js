import * as types from "./actionTypes";
const actions = {
  fetchUser: function (payload) {
    return { type: types.FETCH_USER, payload };
  },
  updateUser: function () {
    return { type: types.UPDATE_USER };
  },
  removeUser: function () {
    return { type: types.REMOVE_USER };
  },
  fetchTags: function (payload) {
    return { type: types.FETCH_TAGS, payload };
  },
};

export default actions;
