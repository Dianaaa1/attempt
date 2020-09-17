import { combineReducers, createStore, applyMiddleware } from "redux";
import authorization from './authUser';
import createSagaMiddleware from "redux-saga";
import projectsFromDb from './projects';

export const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({authorization, projectsFromDb});
export default createStore(rootReducer, applyMiddleware(sagaMiddleware));

export type RootState = ReturnType<typeof rootReducer>