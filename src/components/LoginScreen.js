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

import { Button } from './ui';
import { fetchLogin } from '../redux/login.actions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 28,
    paddingHorizontal: 28,
    paddingVertical: 20,
  },
  formContainer: {
    flex: 1,
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

class LoginScreen extends React.PureComponent {
  state = {
    username: '',
    password: '',
  };

  handleLogin = () => this.props.fetchLogin(this.state.username, this.state.password);

  render() {
    const { error, loading } = this.props;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Log in</Text>
            <TextInput
              style={styles.formField}
              onChangeText={username => this.setState({ username })}
              value={this.state.username}
              placeholder="Username"
              underlineColorAndroid="transparent"
              autoCorrect={false}
            />
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
            {error && <Text style={styles.error}>{error}</Text>}
            <Button title="Log In" loading={loading} onPress={this.handleLogin} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default connect(
  state => ({
    loading: state.login.loading,
    error: state.login.error,
  }),
  {
    fetchLogin,
  },
)(LoginScreen);
