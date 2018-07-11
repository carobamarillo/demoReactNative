import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import DetailsScreen from './DetailScreen';

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
        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Details')}>
          <Text style={styles.buttonText}>Detalle</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#1b4180'
      },
      headerTintColor: '#fff'
    }
  }
);

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
    Details: DetailsScreen
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#1b4180'
      },
      headerTintColor: '#fff'
    }
  }
);

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
          iconName = `ios-help${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-settings${focused ? '' : '-outline'}`;
        }
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={30} color={tintColor} />;
      }
    }),
    tabBarOptions: {
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
