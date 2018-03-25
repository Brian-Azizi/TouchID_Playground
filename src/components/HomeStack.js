import { StackNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import ConfirmPasswordScreen from './ConfirmPasswordScreen';

const HomeStack = StackNavigator(
  {
    Home: { screen: HomeScreen },
    Settings: { screen: SettingsScreen },
    ConfirmPassword: { screen: ConfirmPasswordScreen },
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

export default HomeStack;
