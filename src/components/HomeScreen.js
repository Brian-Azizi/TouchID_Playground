import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

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

const HomeScreen = props => (
  <View style={styles.container}>
    <Text style={styles.title}>Hi {props.username}</Text>
    <Text style={styles.subtitle}>You are now logged in!</Text>
  </View>
);

export default connect(state => ({
  username: state.login.username,
}))(HomeScreen);
