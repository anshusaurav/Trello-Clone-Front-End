import { combineReducers } from "redux";
import userReducer from "./userReducer";
import tagReducer from "./tagReducer";
const rootReducer = combineReducers({ user: userReducer, tags: tagReducer });
export default rootReducer;
