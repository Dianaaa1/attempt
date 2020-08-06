import { ADD_PROJ, TOGGLE_PROJ, EDIT_PROJ, DELETE_PROJ, AUTH_USER, USER_DATA, GETJSON } from "./actionType";

let nextId = 0;

export const addProject = (name, description) => ({
  type: ADD_PROJ,
  payload: {
    id: ++nextId,
    name,
    description
  }
});
export const toggleProject = id => ({
  type: TOGGLE_PROJ,
  payload: { id }
});
export const editProject = (id, name, description) => ({
  type: EDIT_PROJ,
  payload: { id, name, description }
});
export const deleteProject = id => ({
  type: DELETE_PROJ,
  payload: { id }
});
export const authUser=login => ({
  type: AUTH_USER,
  payload: { login } 
})
export const userData=(username, password)=>({
  type: USER_DATA,
  payload: {username, password}
})
export const jsonData=(json)=>({
  type: GETJSON,
  payload: json
})