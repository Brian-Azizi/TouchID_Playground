import React from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import { fetchLogin } from '../redux/login.actions';
import { Button } from './ui';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    paddingBottom: 60,
  },
  title: {
    fontSize: 28,
    paddingHorizontal: 28,
    paddingVertical: 18,
  },
  formField: {
    height: 50,
    fontSize: 18,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 28,
    marginVertical: 4,
    paddingHorizontal: 12,
  },
  error: {
    color: 'red',
    marginHorizontal: 20,
    padding: 8,
    fontSize: 18,
  },
});

class LoginScreen extends React.PureComponent {
  state = {
    password: null,
  };

  handleSubmit = () => {
    this.props.fetchLogin(
      this.props.username,
      this.state.password,
      true,
      this.props.navigation.goBack,
    );
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Text style={styles.title}>Confirm your password to enable Touch ID</Text>
          <TextInput
            style={styles.formField}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            placeholder="Password"
            secureTextEntry
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {this.props.error && <Text style={styles.error}>{this.props.error}</Text>}
          <Button
            onPress={this.handleSubmit}
            title="Enable Touch ID"
            loading={this.props.loading}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default connect(
  state => ({
    loading: state.login.loading,
    error: state.login.error,
    username: state.login.username,
  }),
  {
    fetchLogin,
  },
)(LoginScreen);
