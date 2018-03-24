import React from 'react';
import { SwitchNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import login from './login';
import session from './session';
import touchId from './touchId';
import NavigatorService from './navigator';
import WelcomeStack from './components/WelcomeStack';
import HomeStack from './components/HomeStack';
import LoadingScreen from './components/LoadingScreen';

const reducers = combineReducers({
  login,
  session,
  touchId,
});

const store = createStore(reducers, applyMiddleware(thunk));

const BaseNavigator = new SwitchNavigator({
  Loading: { screen: LoadingScreen },
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
