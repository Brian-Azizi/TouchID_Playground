import { AsyncStorage } from 'react-native';

export const SET_TOKEN = {
  REQUEST: 'SET_TOKEN.REQUEST',
  SUCCESS: 'SET_TOKEN.SUCCESS',
  ERROR: 'SET_TOKEN.ERROR',
};

export const setToken = token => dispatch => {
  dispatch({ type: SET_TOKEN.REQUEST });
  AsyncStorage.setItem('token', token || '')
    .then(() => dispatch({ type: SET_TOKEN.SUCCESS, token }))
    .catch(error => dispatch({ type: SET_TOKEN.ERROR, error: error.message }));
};
