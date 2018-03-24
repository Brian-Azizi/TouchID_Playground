import { GET_TOUCH_ID_SUPPORT } from './touchId.actions';

const initialState = {
  isSupported: false,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TOUCH_ID_SUPPORT.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_TOUCH_ID_SUPPORT.SUCCESS:
      return {
        ...state,
        loading: false,
        isSupported: action.isSupported,
      };
    case GET_TOUCH_ID_SUPPORT.ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
