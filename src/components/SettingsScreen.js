import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { Button } from './ui';
import { fetchLogout } from '../login.actions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#F5FCFF',
    paddingBottom: 60,
  },
  title: {
    fontSize: 28,
    paddingHorizontal: 28,
    paddingVertical: 20,
  },
  subtitle: {
    color: '#333333',
    paddingHorizontal: 28,
    marginBottom: 5,
    fontSize: 20,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 28,
    alignItems: 'center',
  },
  formLabel: {
    fontSize: 18,
  },
  error: {
    color: 'red',
    marginHorizontal: 20,
    padding: 8,
    fontSize: 18,
  },
});

const SettingsScreen = props => (
  <View style={styles.container}>
    <View>
      <Text style={styles.title}>Settings</Text>
    </View>
    <View>
      <Button title="Log out" color="red" loading={props.loading} onPress={props.fetchLogout} />
      {props.error && <Text style={styles.error}>{props.error}</Text>}
    </View>
  </View>
);

export default connect(
  state => ({
    error: state.login.error,
    loading: state.login.loading,
  }),
  {
    fetchLogout,
  },
)(SettingsScreen);
