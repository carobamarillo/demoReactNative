import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import DetailsScreen from './DetailScreen';
import LoginScreen from './LoginScreen';
//import { Icon } from 'react-native-elements';

class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Details')}>
          <Text style={styles.buttonText}>Detalle</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class SettingsScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.popToTop()}>
          <Text style={styles.buttonText}>CERRAR SESION</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

//Home
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen
  },
  {
    navigationOptions: {
      headerTitle: 'Inicio',
      headerStyle: {
        backgroundColor: '#1b4180'
      },
      headerTintColor: '#fff'
    }
  }
);

// Configuracion
const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
    Login: LoginScreen
  },

  {
    navigationOptions: {
      headerTitle: 'Configuracion',
      headerStyle: {
        backgroundColor: '#1b4180'
      },
      headerTintColor: '#fff'
    }
  }
);

// Tabs
export default createBottomTabNavigator(
  {
    Home: HomeStack,
    Settings: SettingsStack
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        }
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      showIcon: true,
      activeTintColor: 'white',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: '#1b417f'
      }
    }
  }
);

const styles = {
  buttonContainer: {
    backgroundColor: '#333',
    paddingVertical: 15,
    width: 120,
    borderRadius: 5,
    elevation: 2
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700'
  }
};
