import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from './ui';

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
});

const SettingsScreen = () => (
  <View style={styles.container}>
    <View>
      <Text style={styles.title}>Settings</Text>
    </View>
    <Button title="Log out" color="red" />
  </View>
);

export default SettingsScreen;
