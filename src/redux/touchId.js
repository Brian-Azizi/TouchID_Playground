import {
  GET_TOUCH_ID_SUPPORT,
  ENABLE_TOUCH_ID,
  GET_TOUCH_ID_CREDENTIALS,
  TOUCH_ID_LOGIN,
} from './touchId.actions';

const initialState = {
  isSupported: false,
  isEnabled: false,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TOUCH_ID_SUPPORT.REQUEST:
    case ENABLE_TOUCH_ID.REQUEST:
    case GET_TOUCH_ID_CREDENTIALS.REQUEST:
    case TOUCH_ID_LOGIN.REQUEST:
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
    case ENABLE_TOUCH_ID.SUCCESS:
    case GET_TOUCH_ID_CREDENTIALS.SUCCESS:
      return {
        ...state,
        loading: false,
        isEnabled: true,
      };
    case TOUCH_ID_LOGIN.SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case GET_TOUCH_ID_SUPPORT.ERROR:
    case ENABLE_TOUCH_ID.ERROR:
    case GET_TOUCH_ID_CREDENTIALS.ERROR:
    case TOUCH_ID_LOGIN.ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
