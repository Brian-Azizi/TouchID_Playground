import { AsyncStorage } from 'react-native';

import { fetchAuthenticate } from './login.actions';

export const SET_TOKEN = {
  REQUEST: 'SET_TOKEN.REQUEST',
  SUCCESS: 'SET_TOKEN.SUCCESS',
  ERROR: 'SET_TOKEN.ERROR',
};

export const GET_TOKEN = {
  REQUEST: 'GET_TOKEN.REQUEST',
  SUCCESS: 'GET_TOKEN.SUCCESS',
  ERROR: 'GET_TOKEN.ERROR',
};

export const setToken = token => dispatch => {
  dispatch({ type: SET_TOKEN.REQUEST });
  AsyncStorage.setItem('token', token || '')
    .then(() => dispatch({ type: SET_TOKEN.SUCCESS, token }))
    .catch(error => dispatch({ type: SET_TOKEN.ERROR, error: error.message }));
};

export const startSession = () => dispatch => {
  dispatch({ type: GET_TOKEN.REQUEST });
  AsyncStorage.getItem('token')
    .then(token => {
      if (!token) {
        return Promise.reject(new Error('No token in async storage'));
      }
      dispatch(fetchAuthenticate(token));
      return dispatch({ type: GET_TOKEN.SUCCESS, token });
    })
    .catch(error => dispatch({ type: GET_TOKEN.ERROR, error: error.message }));
};
