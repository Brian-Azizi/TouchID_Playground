import { login, logout, authenticate } from '../api';
import NavigatorService from './navigator';
import { setToken, clearToken } from './session.actions';
import { enableTouchId } from './touchId.actions';

export const LOGIN = {
  REQUEST: 'LOGIN.REQUEST',
  SUCCESS: 'LOGIN.SUCCESS',
  ERROR: 'LOGIN.ERROR',
};

export const LOGOUT = {
  REQUEST: 'LOGOUT.REQUEST',
  SUCCESS: 'LOGOUT.SUCCESS',
  ERROR: 'LOGOUT.ERROR',
};

export const AUTHENTICATE = {
  REQUEST: 'AUTHENTICATE.REQUEST',
  SUCCESS: 'AUTHENTICATE.SUCCESS',
  ERROR: 'AUTHENTICATE.ERROR',
};

export const fetchLogin = (
  username,
  password,
  enableTouchIdOnSuccess,
  successCallback,
) => dispatch => {
  dispatch({ type: LOGIN.REQUEST });
  login(username, password)
    .then(token => {
      dispatch({ type: LOGIN.SUCCESS, username });
      dispatch(setToken(token));
      if (enableTouchIdOnSuccess) {
        dispatch(enableTouchId(username, password));
      }
      if (successCallback) {
        successCallback();
      } else {
        NavigatorService.navigate('HomeStack');
      }
    })
    .catch(error => dispatch({ type: LOGIN.ERROR, error: error.message }));
};

export const fetchLogout = () => (dispatch, getState) => {
  dispatch({ type: LOGOUT.REQUEST });
  const { token } = getState().session;
  logout(token)
    .then(() => {
      dispatch({ type: LOGOUT.SUCCESS });
      dispatch(clearToken());
      NavigatorService.navigate('WelcomeStack');
    })
    .catch(error => dispatch({ type: LOGOUT.ERROR, error: error.message }));
};

export const fetchAuthenticate = token => dispatch => {
  dispatch({ type: AUTHENTICATE.REQUEST });
  authenticate(token)
    .then(username => {
      dispatch({ type: AUTHENTICATE.SUCCESS, username });
      NavigatorService.navigate('HomeStack');
    })
    .catch(error => {
      dispatch({ type: AUTHENTICATE.ERROR, error: error.message });
      NavigatorService.navigate('WelcomeStack');
    });
};
