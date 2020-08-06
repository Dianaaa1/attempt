import { AUTH_USER, USER_DATA, GETJSON } from "../actions/actionType";

const defaultState = {};
const authorization = (state = defaultState, action) => {
  switch (action.type) {
    case AUTH_USER: {
      const { login } = action.payload;
      return {
        ...state,
        login,
      };
    }
    case USER_DATA: {
      const { username, password } = action.payload;
      return { ...state, username, password };
    }

    case GETJSON: {
      return {...state, json: action.payload};
    }
    default:
      return state;
  }
};

export default authorization;
