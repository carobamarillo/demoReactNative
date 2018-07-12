import React from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import { fetchPeople } from '../../actions/index';

class LoginScreen extends React.Component {
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
    //if (this.state.password === '1234' && this.state.user === 'German Gonzalez') {
    if (this.state.password === '' && this.state.user === '') {
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
          <Image source={require('../images/logo2.png')} />
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
    backgroundColor: '#303030'
    //backgroundColor: '#1b4180'
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
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: '#171717',
    paddingVertical: 15
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
