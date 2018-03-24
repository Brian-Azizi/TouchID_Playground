import { login, logout } from './api';
import NavigatorService from './navigator';

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

export const fetchLogin = (username, password) => dispatch => {
  dispatch({ type: LOGIN.REQUEST });
  login(username, password)
    .then(userToken => {
      dispatch({ type: LOGIN.SUCCESS, username, userToken });
      NavigatorService.navigate('HomeStack');
    })
    .catch(error => dispatch({ type: LOGIN.ERROR, error: error.message }));
};

export const fetchLogout = () => (dispatch, getState) => {
  dispatch({ type: LOGOUT.REQUEST });
  const { userToken } = getState().login;
  logout(userToken)
    .then(() => {
      dispatch({ type: LOGOUT.SUCCESS });
      NavigatorService.navigate('WelcomeStack');
    })
    .catch(error => dispatch({ type: LOGOUT.ERROR, error: error.message }));
};
