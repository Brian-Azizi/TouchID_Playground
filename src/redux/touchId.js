import {
  GET_TOUCH_ID_SUPPORT,
  ENABLE_TOUCH_ID,
  GET_TOUCH_ID_CREDENTIALS,
  TOUCH_ID_LOGIN,
  DISABLE_TOUCH_ID,
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
    case DISABLE_TOUCH_ID.REQUEST:
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
        isEnabled: action.isEnabled,
      };
    case TOUCH_ID_LOGIN.SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DISABLE_TOUCH_ID.SUCCESS:
    return {
      ...state,
      loading: false,
      isEnabled: false,
    };
    case GET_TOUCH_ID_SUPPORT.ERROR:
    case ENABLE_TOUCH_ID.ERROR:
    case GET_TOUCH_ID_CREDENTIALS.ERROR:
    case TOUCH_ID_LOGIN.ERROR:
    case DISABLE_TOUCH_ID.ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
