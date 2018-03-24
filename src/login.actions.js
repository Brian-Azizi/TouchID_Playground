import { login } from './api';

export const LOGIN = {
  REQUEST: 'LOGIN.REQUEST',
  SUCCESS: 'LOGIN.SUCCESS',
  ERROR: 'LOGIN.ERROR',
};

export const fetchLogin = (username, password) => dispatch => {
  dispatch({ type: LOGIN.REQUEST });
  login(username, password)
    .then(userToken => dispatch({ type: LOGIN.SUCCESS, username, userToken }))
    .catch(error => dispatch({ type: LOGIN.ERROR, error: error.message }));
};
