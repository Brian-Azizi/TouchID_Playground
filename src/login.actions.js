import { login } from './api';
import NavigatorService from './navigator';

export const LOGIN = {
  REQUEST: 'LOGIN.REQUEST',
  SUCCESS: 'LOGIN.SUCCESS',
  ERROR: 'LOGIN.ERROR',
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
