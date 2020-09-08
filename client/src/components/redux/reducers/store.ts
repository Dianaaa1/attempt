import { combineReducers, createStore, applyMiddleware } from "redux";
import projectList from "./projList";
import projectMap from "./projMap";
import authorization from './authUser';
import createSagaMiddleware from "redux-saga";

export const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({ projectList, projectMap, authorization});
export default createStore(rootReducer, applyMiddleware(sagaMiddleware));

export type RootState = ReturnType<typeof rootReducer>