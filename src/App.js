import { SwitchNavigator } from 'react-navigation';

import WelcomeStack from './components/WelcomeStack';

const App = new SwitchNavigator({
  WelcomeStack: { screen: WelcomeStack },
});

export default App;
