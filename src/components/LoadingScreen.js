import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import { startSession } from '../session.actions';

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
})(LoadingScreen);
