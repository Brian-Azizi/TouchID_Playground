import { LOGIN, LOGOUT } from './login.actions';

const initialState = {
  loading: false,
  error: null,
  username: null,
  userToken: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN.REQUEST:
    case LOGOUT.REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOGIN.SUCCESS: {
      const { username, userToken } = action;
      return {
        ...state,
        username,
        userToken,
        loading: false,
        error: null,
      };
    }
    case LOGOUT.SUCCESS: {
      return initialState;
    }
    case LOGIN.ERROR:
    case LOGOUT.ERROR: {
      const { error } = action;
      return {
        ...state,
        error,
        loading: false,
      };
    }
    default:
      return state;
  }
};
