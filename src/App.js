import React from 'react';
import { SwitchNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';
import NavigatorService from './navigator';
import WelcomeStack from './components/WelcomeStack';

const store = createStore(reducer, applyMiddleware(thunk));

const BaseNavigator = new SwitchNavigator({
  WelcomeStack: { screen: WelcomeStack },
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
