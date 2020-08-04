export const getProjectList = (store) => store.projectList;

export const getProjectById = (store, id) => ({ ...store.projectMap[id], id });

export const getProjects = (store) => getProjectList(store).map((id) => getProjectById(store, id));

export const getAuth=(store) => store.authorization;

export const getAuthStatus=(store)=> getAuth(store).login;


