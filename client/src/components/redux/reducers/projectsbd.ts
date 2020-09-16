import { ALL_PROJ, actionType, GET_STATE } from "../actions/actionTypes";

const defaultState: any = {
    project: [],
    isFetching: true,
};
const projectsFromDb = (state = defaultState, action: actionType) => {
  switch (action.type) {
    case ALL_PROJ: {
      const { project, isFetching } = action.payload;
      return {...state, project, isFetching};
    }
    case GET_STATE: {
      const { isFetching } = action.payload;
      return {...state, isFetching};
    }
    default:
      return state;
  }
};
export default projectsFromDb;
