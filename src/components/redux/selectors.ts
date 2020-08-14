import { RootState } from "./reducers/store";

export function getProjectList(store: RootState) {
  return store.projectList;
}

export function getProjectById(store: RootState, id: number) {
  return { ...store.projectMap[id], id };
}

export function getProjects(store: RootState) {
  return store.projectList.map((id) => getProjectById(store, id));
}

export function getAuth(store: RootState) {
  return store.authorization;
}

export function getAuthStatus(store: RootState) {
  return store.authorization.login;
}
