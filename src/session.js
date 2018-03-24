import { SET_TOKEN, GET_TOKEN } from './session.actions';

const initialState = {
  token: null,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN.REQUEST:
    case GET_TOKEN.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SET_TOKEN.SUCCESS:
    case GET_TOKEN.SUCCESS: {
      const { token } = action;
      return {
        ...state,
        token,
        loading: false,
        error: null,
      };
    }
    case SET_TOKEN.ERROR:
    case GET_TOKEN.ERROR: {
      const { error } = action;
      return {
        ...state,
        loading: false,
        error,
      };
    }
    default: {
      return state;
    }
  }
};
