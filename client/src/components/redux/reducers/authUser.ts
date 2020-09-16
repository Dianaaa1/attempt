import { AUTH_USER, USER_DATA, actionType } from "../actions/actionTypes";

const defaultState = {
  login: false, 
  username: '',
  password:''
};
const authorization = (state = defaultState, action: actionType) => {
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
    default:
      return state;
  }
};

export default authorization;
