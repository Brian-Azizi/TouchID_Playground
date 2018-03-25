import React from 'react';
import { Alert, StyleSheet, Switch, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { Button } from './ui';
import { fetchLogout } from '../redux/login.actions';
import { disableTouchId } from '../redux/touchId.actions';

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

class SettingsScreen extends React.PureComponent {
  handleTouchIdSettingsChange = value => {
    if (!value) {
      return Alert.alert('Are you sure you want to turn off Touch ID?', null, [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Disable', style: 'destructive', onPress: this.props.disableTouchId },
      ]);
    }
    return this.props.navigation.navigate('ConfirmPassword');
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Settings</Text>
          <View style={styles.switchRow}>
            <Text style={styles.formLabel}>Touch ID</Text>
            <Switch
              disabled={!this.props.isTouchIdSupported}
              value={this.props.isTouchIdEnabled}
              onValueChange={this.handleTouchIdSettingsChange}
            />
          </View>
        </View>
        <View>
          <Button title="Log out" color="red" loading={this.props.loading} onPress={this.props.fetchLogout} />
          {this.props.error && <Text style={styles.error}>{this.props.error}</Text>}
        </View>
      </View>
    );
  }
}

export default connect(
  state => ({
    error: state.login.error,
    loading: state.login.loading,
    isTouchIdSupported: state.touchId.isSupported && !state.touchId.error,
    isTouchIdEnabled: state.touchId.isEnabled && !state.touchId.error,
  }),
  {
    fetchLogout,
    disableTouchId,
  },
)(SettingsScreen);
