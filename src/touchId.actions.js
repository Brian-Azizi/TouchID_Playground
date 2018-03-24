import TouchID from 'react-native-touch-id';

export const GET_TOUCH_ID_SUPPORT = {
  REQUEST: 'GET_TOUCH_ID_SUPPORT.REQUEST',
  SUCCESS: 'GET_TOUCH_ID_SUPPORT.SUCCESS',
  ERROR: 'GET_TOUCH_ID_SUPPORT.ERROR',
};

export const getTouchIdSupport = () => dispatch => {
  dispatch({ type: GET_TOUCH_ID_SUPPORT.REQUEST });
  TouchID.isSupported()
    .then(biometryType =>
      dispatch({ type: GET_TOUCH_ID_SUPPORT.SUCCESS, isSupported: !!biometryType }))
    .catch(error => dispatch({ type: GET_TOUCH_ID_SUPPORT.ERROR, error: error.message }));
};
