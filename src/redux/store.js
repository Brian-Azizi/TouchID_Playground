import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import login from './login';
import session from './session';
import touchId from './touchId';

const reducers = combineReducers({
  login,
  session,
  touchId,
});

export default createStore(reducers, applyMiddleware(thunk));
