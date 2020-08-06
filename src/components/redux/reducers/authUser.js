import { AUTH_USER, USER_DATA } from "../actions/actionType";

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
    case USER_DATA:{
      const {username, password}=action.payload;
      return {...state, username, password}
    }
    default:
      return state;
  }
};

export default authorization;
