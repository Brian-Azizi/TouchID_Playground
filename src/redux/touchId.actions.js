import TouchID from 'react-native-touch-id';
import { setGenericPassword, getGenericPassword } from 'react-native-keychain';

export const GET_TOUCH_ID_SUPPORT = {
  REQUEST: 'GET_TOUCH_ID_SUPPORT.REQUEST',
  SUCCESS: 'GET_TOUCH_ID_SUPPORT.SUCCESS',
  ERROR: 'GET_TOUCH_ID_SUPPORT.ERROR',
};

export const ENABLE_TOUCH_ID = {
  REQUEST: 'ENABLE_TOUCH_ID.REQUEST',
  SUCCESS: 'ENABLE_TOUCH_ID.SUCCESS',
  ERROR: 'ENABLE_TOUCH_ID.ERROR',
};

export const GET_TOUCH_ID_CREDENTIALS = {
  REQUEST: 'GET_TOUCH_ID_CREDENTIALS.REQUEST',
  SUCCESS: 'GET_TOUCH_ID_CREDENTIALS.SUCCESS',
  ERROR: 'GET_TOUCH_ID_CREDENTIALS.ERROR',
};

export const getTouchIdSupport = () => dispatch => {
  dispatch({ type: GET_TOUCH_ID_SUPPORT.REQUEST });
  TouchID.isSupported()
    .then(biometryType =>
      dispatch({ type: GET_TOUCH_ID_SUPPORT.SUCCESS, isSupported: !!biometryType }))
    .catch(error => dispatch({ type: GET_TOUCH_ID_SUPPORT.ERROR, error: error.message }));
};

export const enableTouchId = (username, password) => dispatch => {
  dispatch({ type: ENABLE_TOUCH_ID.REQUEST });
  setGenericPassword(username, password)
    .then(() => {
      dispatch({ type: ENABLE_TOUCH_ID.SUCCESS, isEnabled: true });
    })
    .catch(error => dispatch({ type: ENABLE_TOUCH_ID.ERROR, error: error.message }));
};

export const getTouchIdCredentials = () => dispatch => {
  dispatch({ type: GET_TOUCH_ID_CREDENTIALS.REQUEST });
  getGenericPassword()
    .then(credentials => {
      const isEnabled = !!credentials.username && !!credentials.password;
      dispatch({ type: GET_TOUCH_ID_CREDENTIALS.SUCCESS, isEnabled });
    })
    .catch(error => dispatch({ type: GET_TOUCH_ID_CREDENTIALS.ERROR, error: error.message }));
};
