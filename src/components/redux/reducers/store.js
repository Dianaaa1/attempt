import { combineReducers, createStore } from "redux";
import projectList from "./projList";
import projectMap from "./projMap";
import authorization from './authUser';

const rootReducer = combineReducers({ projectList, projectMap, authorization});
export default createStore(rootReducer);
