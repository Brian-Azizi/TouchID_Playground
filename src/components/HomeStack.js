import { StackNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen';

const HomeStack = StackNavigator(
  {
    Home: { screen: HomeScreen },
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
