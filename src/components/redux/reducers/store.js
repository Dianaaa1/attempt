import { combineReducers, createStore } from "redux";
import projList from "./projList";
import projMap from "./projMap";
import authorization from './authUser';

const rootReducer = combineReducers({ projList, projMap, authorization});
export default createStore(rootReducer);
