import { StackNavigator } from 'react-navigation';

import WelcomeScreen from './WelcomeScreen';

const WelcomeStack = StackNavigator(
  {
    Welcome: { screen: WelcomeScreen },
  },
  {
    navigationOptions: {
      headerStyle: {
        borderBottomWidth: 0,
        shadowOpacity: 0,
        elevation: 0,
        backgroundColor: '#F5FCFF',
      },
    },
  },
);

export default WelcomeStack;
