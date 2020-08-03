import { ADD_PROJ, TOGGLE_PROJ, EDIT_PROJ, DELETE_PROJ } from "../actions/actionType";

const defaultState = {};

const projMap = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_PROJ: {
            const { id, name, description } = action.payload;
            return {
                ...state,
                [id]: {
                    name,
                    description,
                    completed: false
                }
            };
        }
        case TOGGLE_PROJ: {
            const { id } = action.payload;
            const currentTodo = state[id];
            return {
                ...state,
                [id]: { ...currentTodo, completed: !currentTodo.completed }
            };
        }
        case EDIT_PROJ: {
            const { id, name, description } = action.payload;
            return {
                ...state,
                [id]: { name, description }
            };
        }
        case DELETE_PROJ: {
            const { id } = action.payload;
            return {
                ...state,
                [id]: {}
            };
        }
        default:
            return state;
    }
};

export default projMap;
