import { ADD_PROJ, TOGGLE_PROJ, EDIT_PROJ, DELETE_PROJ } from "./actionType";

let nextId = 0;

export const addProj = (name, description) => ({
  type: ADD_PROJ,
  payload: {
    id: ++nextId,
    name,
    description
  }
});
export const toggleProj = id => ({
  type: TOGGLE_PROJ,
  payload: { id }
});
export const editProj = (id, name, description) => ({
  type: EDIT_PROJ,
  payload: { id, name, description }
});
export const deleteProj = id => ({
  type: DELETE_PROJ,
  payload: { id }
});