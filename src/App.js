import React from 'react';
import { SwitchNavigator } from 'react-navigation';

import NavigatorService from './navigator';
import WelcomeStack from './components/WelcomeStack';

const BaseNavigator = new SwitchNavigator({
  WelcomeStack: { screen: WelcomeStack },
});

const App = () => (
  <BaseNavigator
    ref={navigatorRef => {
      NavigatorService.setContainer(navigatorRef);
    }}
  />
);

export default App;
