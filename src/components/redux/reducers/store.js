import { combineReducers, createStore } from "redux";
import projList from "./projList";
import projMap from "./projMap";

const rootReducer = combineReducers({ projList, projMap });
export default createStore(rootReducer);
