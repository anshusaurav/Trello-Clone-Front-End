import { FETCH_TAGS } from "../actionTypes";
export default function tagReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_TAGS:
      // console.log("Payload TAGS: ", action.payload);
      return Object.assign({}, state, { tags: action.payload });
    default:
      return state;
  }
}
