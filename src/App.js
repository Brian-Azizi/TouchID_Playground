import React from 'react';
import { SwitchNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import NavigatorService from './redux/navigator';
import store from './redux/store';

import WelcomeStack from './components/WelcomeStack';
import HomeStack from './components/HomeStack';
import LoadingScreen from './components/LoadingScreen';

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
