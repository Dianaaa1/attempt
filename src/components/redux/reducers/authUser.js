import { AUTH_USER } from "../actions/actionType";

const defaultState = {};
const authorization = (state = defaultState, action) => {
  switch (action.type) {
    case AUTH_USER: {
      const { login } = action.payload;
      return {
        login,
      };
    }
    default:
      return state;
  }
};

export default authorization;
