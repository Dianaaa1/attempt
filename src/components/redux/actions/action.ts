import { ADD_PROJ, TOGGLE_PROJ, EDIT_PROJ, DELETE_PROJ, AUTH_USER, USER_DATA, GETJSON, IaddProject, ItoggleProject, IeditProject, IdeleteProject, IauthUser, IuserData, IgetJSON} from "./actionType";


let nextId = 0;

export function addProject (name: string, description:string) : IaddProject {
  return {
  type: ADD_PROJ,
  payload: {
    id: ++nextId,
    name,
    description
  }
}};

export function toggleProject (id: number) : ItoggleProject {
  return {
    type: TOGGLE_PROJ,
    payload:  {id} ,
  }
};
export function editProject (id: number, name: string, description:string) : IeditProject {
  return {
    type: EDIT_PROJ,
    payload: { id, name, description },
  }
};
export function deleteProject (id: number) : IdeleteProject{
  return {
    type: DELETE_PROJ,
    payload: { id },
  }
};
export function authUser (login: boolean) : IauthUser{
  return {
    type: AUTH_USER,
    payload: { login },
  }
};
export function userData (username: string, password:string) : IuserData{
  return {
    type: USER_DATA,
    payload: {username, password}
  }
};
export function jsonData (json: any) : IgetJSON{
  return {
    type: GETJSON,
    payload: json
  }
};

