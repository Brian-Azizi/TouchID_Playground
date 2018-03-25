import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import { startSession } from '../redux/session.actions';
import { getTouchIdSupport, getTouchIdCredentials } from '../redux/touchId.actions';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingBottom: 120,
  },
});

class LoadingScreen extends React.PureComponent {
  componentDidMount() {
    this.props.startSession();
    this.props.getTouchIdSupport();
    this.props.getTouchIdCredentials();
  }

  render() {
    return (
      <View style={style.container}>
        <ActivityIndicator />
      </View>
    );
  }
}

export default connect(null, {
  startSession,
  getTouchIdSupport,
  getTouchIdCredentials,
})(LoadingScreen);
