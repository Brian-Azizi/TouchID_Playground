import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from './ui';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingBottom: 120,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    margin: 50,
  },
  subtitle: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize: 20,
  },
});

const WelcomeScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Welcome to the Touch ID Demo App</Text>
    <Text style={styles.subtitle}>Please press &quot;Log in&quot; to get started</Text>
  </View>
);

WelcomeScreen.navigationOptions = ({ navigation }) => ({
  headerRight: <Button onPress={() => navigation.navigate('Login')} title="Log In" />,
});

export default WelcomeScreen;
