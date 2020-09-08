import { ADD_PROJ, actionType } from "../actions/actionType";

const defaultState: number[] = [];
const projectList = (state = defaultState, action: actionType) => {
  switch (action.type) {
    case ADD_PROJ: {
      const { id } = action.payload;
      return [...state, id];
    }
    default:
      return state;
  }
};

export default projectList;
