import React, { Component } from 'react';
import { Text, View, TextInput, Alert, Image, TouchableOpacity, KeyboardAvoidingView, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { fetchPeople } from '../../actions/index';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { user: '', password: '' };
  }

  componentDidMount() {
    if (this.props.tabnavi.isFetching === false) {
      this.props.fetchPeople();
    } else {
      alert('Todavia no!');
    }
  }

  validateLogin() {
    // if (this.state.password === '' && this.state.user === '')
    if (this.state.password === '1234' && this.state.user === 'German Gonzalez') {
      this.props.navigation.navigate('PostHome');
    } else {
      Alert.alert('Usuario o contraseña incorrecta');
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.logoContainer}>
          <Image source={require('../images/logo2.png')} style={{ width: 250, height: 250 }} />
        </View>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            onChangeText={user => this.setState({ user })}
            placeholder={'Usuario'}
            placeholderTextColor="rgba(255,255,255,0.2)"
            value={this.state.User}
            underlineColorAndroid="transparent"
            returnKeyType="next"
          />
          <TextInput
            style={styles.input}
            onChangeText={password => this.setState({ password })}
            placeholder={'Contraseña'}
            placeholderTextColor="rgba(255,255,255,0.2)"
            value={this.state.password}
            secureTextEntry
            underlineColorAndroid="transparent"
            returnKeyType="go"
          />
          <TouchableOpacity style={styles.buttonContainer} onPress={() => this.validateLogin()}>
            <Text style={styles.buttonText}>INICIAR SESION</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'rgb(25,69,116)'
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  formContainer: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginBottom: 10,
    color: '#fff',
    paddingHorizontal: 10,
    borderRadius: 2
  },
  buttonContainer: {
    backgroundColor: 'rgb(17,48,81)',
    paddingVertical: 15,

    elevation: 2 // Android
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700'
  }
};

function mapStateToProps(state) {
  return state;
}
export default connect(
  mapStateToProps,
  { fetchPeople }
)(LoginScreen);
