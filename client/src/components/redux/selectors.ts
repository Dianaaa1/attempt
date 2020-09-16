import { RootState } from "./reducers/store";

export function getStore(store: RootState) {
  return store;
}
export function getAuth(store: RootState) {
  return store.authorization;
}

export function getAuthStatus(store: RootState) {
  return store.authorization.login;
}

export function getNewStore(store: RootState) {
  return store.projectsFromDb;
}

export function getOneProject(store: RootState, id: number) {
  return { ...store.projectsFromDb.project[id] };
}
export function getProjectsFromNewStore(store: RootState) {
  return store.projectsFromDb.project;
} 