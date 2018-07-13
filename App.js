import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Alert } from 'react-native';
import OneSignal from 'react-native-onesignal';
import { createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { tabnavi } from './reducers/tabnavigation_reducer';
import LoginScreen from './src/components/LoginScreen';
import PostHomeScreen from './src/components/PostHomeScreen';

console.disableYellowBox = true;

const RootStack = createStackNavigator(
  {
    Login: LoginScreen,
    PostHome: PostHomeScreen,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none' //anula el header del stack raiz que es el login y resto de la app(deberia volver para atras con algun boton)
  }
);

export default class App extends Component {
 /* componentWillMount() {
    OneSignal.init('5ddb699b-6bc7-4ed3-aa25-28866f8784e4');
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.enableVibrate(true);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }*/

  render() {
    const appReducer = combineReducers({
      tabnavi
    });

    const createStoreWithMidddleware = applyMiddleware(thunk)(createStore);
    const store = createStoreWithMidddleware(appReducer);

    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}

/*import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  ScrollView,
  Linking
} from 'react-native';

import OneSignal from 'react-native-onesignal';
console.disableYellowBox = true;
let imageUri = 'https://cdn-images-1.medium.com/max/300/1*7xHdCFeYfD8zrIivMiQcCQ.png';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    // OneSignal.setLogLevel(7, 0);

    // let requiresConsent = false;

    this.setState({
      blah: ''
    });

    // OneSignal.setRequiresUserPrivacyConsent(requiresConsent);

    OneSignal.init('5ddb699b-6bc7-4ed3-aa25-28866f8784e4', { kOSSettingsKeyAutoPrompt: true });

    var providedConsent = await OneSignal.userProvidedPrivacyConsent();

    // this.setState({
    //   privacyButtonTitle: `Privacy Consent: ${providedConsent ? 'Granted' : 'Not Granted'}`,
    //   privacyGranted: providedConsent
    // });

    OneSignal.setLocationShared(true);

    // OneSignal.inFocusDisplaying(2);
  }

  componentDidMount() {
    this.onReceived = this.onReceived.bind(this);
    this.onOpened = this.onOpened.bind(this);
    this.onIds = this.onIds.bind(this);
    this.onEmailRegistrationChange = this.onEmailRegistrationChange.bind(this);

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.addEventListener('emailSubscription', this.onEmailRegistrationChange);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
    OneSignal.removeEventListener('emailSubscription', this.onEmailRegistrationChange);
  }

  onEmailRegistrationChange(registration) {
    console.log('onEmailRegistrationChange: ', registration);
  }

  onReceived(notification) {
    console.log('Notification received: ', notification);

    //this.setState({ jsonDebugText: 'RECEIVED: \n' + JSON.stringify(notification, null, 2) });
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);

    this.setState({ blah: 'lo que sea' });
    console.log('primero:', this.state.blah);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  render() {
    console.log('segundo:', this.state.blah);
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#000'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    marginHorizontal: 10
  },
  jsonDebugLabelText: {
    textAlign: 'left',
    color: '#333333',
    marginBottom: 5,
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: '#d45653'
  },
  button: {
    color: '#000000',
    flex: 1
  },
  imageStyle: {
    height: 200,
    width: 200,
    marginTop: 20
  },
  textInput: {
    marginHorizontal: 10,
    height: 40
  }
});
*/
