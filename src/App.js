import React from 'react';
import { SwitchNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import login from './login';
import NavigatorService from './navigator';
import WelcomeStack from './components/WelcomeStack';
import HomeStack from './components/HomeStack';

const reducers = combineReducers({
  login,
});

const store = createStore(reducers, applyMiddleware(thunk));

const BaseNavigator = new SwitchNavigator({
  WelcomeStack: { screen: WelcomeStack },
  HomeStack: { screen: HomeStack },
});

const App = () => (
  <Provider store={store}>
    <BaseNavigator
      ref={navigatorRef => {
        NavigatorService.setContainer(navigatorRef);
      }}
    />
  </Provider>
);

export default App;
