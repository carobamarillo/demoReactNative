import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import DetailsScreen from './DetailScreen';
import LoginScreen from './LoginScreen';
//import { Icon } from 'react-native-elements';

{
  {
    /*<TouchableOpacity
  style={[styles.buttonContainer, { with: 120 }]}
  onPress={() => this.props.navigation.navigate('Details')}
>
  <Text style={styles.buttonText}>Detalle</Text>
</TouchableOpacity>*/
  }
}
class HomeScreen extends Component {
  render() {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
  }
}

class SettingsScreen extends Component {
  render() {
    const list = [
      {
        title: 'German Gonzalez'
      },
      {
        title: 'Cambiar contraseña'
      },
      {
        title: 'Notificaciones'
      },
      {
        title: 'Terminos de uso'
      }
      // more items
    ];
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../images/profilePicture.png')}
            style={{ borderRadius: 180, width: 240, height: 240 }}
          />
        </View>
        <List>{list.map((l, i) => <ListItem key={i} title={l.title} />)}</List>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.popToTop()}>
          <Text style={styles.buttonText}>CERRAR SESION</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// Styles
const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    marginTop: 10,
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

//Home
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen
  },
  {
    //headerMode: 'none',
    navigationOptions: {
      headerTitle: 'Inicio',
      headerStyle: {
        backgroundColor: '#fff'
      },
      headerTintColor: '#333'
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
      headerTitle: 'Perfil',
      headerStyle: {
        backgroundColor: '#fff'
      },
      headerTintColor: '#333'
    }
  }
);

// Tabs
export default createBottomTabNavigator(
  {
    Inicio: HomeStack,
    Configuracion: SettingsStack
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Inicio') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Configuracion') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        }
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      showIcon: true,
      activeTintColor: '#171717',
      //inactiveTintColor: '',
      style: {
        backgroundColor: '#fff'
      }
    }
  }
);
