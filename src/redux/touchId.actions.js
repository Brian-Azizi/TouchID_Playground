import TouchID from 'react-native-touch-id';
import {
  setGenericPassword,
  getGenericPassword,
  resetGenericPassword,
} from 'react-native-keychain';

import { fetchLogin } from './login.actions';

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

export const TOUCH_ID_LOGIN = {
  REQUEST: 'TOUCH_ID_LOGIN.REQUEST',
  SUCCESS: 'TOUCH_ID_LOGIN.SUCCESS',
  ERROR: 'TOUCH_ID_LOGIN.ERROR',
};

export const DISABLE_TOUCH_ID = {
  REQUEST: 'DISABLE_TOUCH_ID.REQUEST',
  SUCCESS: 'DISABLE_TOUCH_ID.SUCCESS',
  ERROR: 'DISABLE_TOUCH_ID.ERROR',
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

export const fetchTouchIdLogin = () => dispatch => {
  dispatch({ type: TOUCH_ID_LOGIN.REQUEST });
  getGenericPassword()
    .then(credentials => {
      const { username, password } = credentials;
      TouchID.authenticate(`to login with username "${username}"`).then(() => {
        dispatch(fetchLogin(username, password, false));
        dispatch({ type: TOUCH_ID_LOGIN.SUCCESS });
      }).catch(error => dispatch({ type: TOUCH_ID_LOGIN.ERROR, error: error.message }));
    })
    .catch(error => dispatch({ type: TOUCH_ID_LOGIN.ERROR, error: error.message }));
};

export const disableTouchId = () => dispatch => {
  dispatch({ type: DISABLE_TOUCH_ID.REQUEST });
  resetGenericPassword()
    .then(() => dispatch({ type: DISABLE_TOUCH_ID.SUCCESS }))
    .catch(error => dispatch({ type: DISABLE_TOUCH_ID.ERROR, error: error.message }));
};
