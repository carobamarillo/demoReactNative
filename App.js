import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import OneSignal from 'react-native-onesignal';
import { createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { tabnavi } from './reducers/tabnavigation_reducer';
import LoginScreen from './src/components/LoginScreen';
import PostHomeScreen from './src/components/PostHomeScreen';

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
  componentWillMount() {
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
  }

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
