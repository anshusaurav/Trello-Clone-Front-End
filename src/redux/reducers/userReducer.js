import { FETCH_USER, UPDATE_USER, REMOVE_USER } from "../actionTypes";

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_USER:
      // console.log("Payoad USER: ", action.payload);
      return Object.assign({}, state, action.payload);
    case UPDATE_USER:
      return Object.assign({}, state, { isUpdated: !state.isUpdated });
    case REMOVE_USER:
      return Object.assign({}, state, { user: null });
    default:
      return state;
  }
}
