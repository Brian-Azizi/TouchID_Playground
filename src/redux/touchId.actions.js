import TouchID from 'react-native-touch-id';
import {
  setGenericPassword,
  getGenericPassword,
  resetGenericPassword,
} from 'react-native-keychain';
import { Platform } from 'react-native';

import NavigatorService from './navigator';
import { fetchLogin } from './login.actions';

const FATAL_ERRORS = [
  'LAErrorPasscodeNotSet',
  'LAErrorTouchIDNotAvailable',
  'LAErrorTouchIDNotEnrolled',
  'RCTTouchIDUnknownError',
  'RCTTouchIDNotSupported',
];

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

export const disableTouchId = () => dispatch => {
  dispatch({ type: DISABLE_TOUCH_ID.REQUEST });
  resetGenericPassword()
    .then(() => dispatch({ type: DISABLE_TOUCH_ID.SUCCESS }))
    .catch(error => dispatch({ type: DISABLE_TOUCH_ID.ERROR, error: error.message }));
};

const setTouchIdFatalError = () => dispatch => {
  dispatch({
    type: TOUCH_ID_LOGIN.ERROR,
    error: 'Something went wrong. We have turned off Touch ID login.',
  });
  dispatch(disableTouchId());
};

export const fetchTouchIdLogin = () => dispatch => {
  dispatch({ type: TOUCH_ID_LOGIN.REQUEST });
  getGenericPassword()
    .then(credentials => {
      const { username, password } = credentials;

      TouchID.authenticate(`to login with username "${username}"`)
        .then(() => {
          const onSuccess = () => {
            dispatch({ type: TOUCH_ID_LOGIN.SUCCESS });
            NavigatorService.navigate('HomeStack');
          };
          const onError = () => dispatch(setTouchIdFatalError());

          dispatch(fetchLogin(username, password, onSuccess, onError));
        })
        .catch(error => {
          if (Platform.OS === 'ios' && FATAL_ERRORS.includes(error.message)) {
            dispatch(setTouchIdFatalError());
          } else {
            dispatch({ type: TOUCH_ID_LOGIN.ERROR, error: null });
          }
        });
    })
    .catch(() => {
      dispatch(setTouchIdFatalError());
    });
};
