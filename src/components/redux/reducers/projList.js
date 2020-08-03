import { ADD_PROJ } from "../actions/actionType";


const defaultState = [];
const projList = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_PROJ: {

            const { id } = action.payload;
            return [...state, id];
        }
        default:
            return state;
    }
};

export default projList;