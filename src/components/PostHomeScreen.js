import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, FlatList, Modal, TouchableHighlight } from 'react-native';
import { List, ListItem, Card, Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import LoginScreen from './LoginScreen';
import OneSignal from 'react-native-onesignal';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalConfirm: false,
      modalOk: false,
      activeIndex: false,
      list: [
        {
          name: 'Orden de compra #460000042',
          nro: 460000042,
          avatar_url: require('../images/sap.png'),
          pos: '10',
          mat: 'escritorio zen1',
          qty: '5',
          unit: '3200',
          total: '16000',
          index: 0
        },
        {
          name: 'Orden de compra #460000042',
          avatar_url: require('../images/sap.png'),
          nro: 460000042,
          pos: '10',
          mat: 'escritorio zen2',
          qty: '5',
          unit: '3200',
          total: '16000',
          index: 1
        },
        {
          name: 'Orden de compra #460000042',
          avatar_url: require('../images/sap.png'),
          nro: 460000042,
          pos: '10',
          mat: 'escritorio zen3',
          qty: '5',
          unit: '3200',
          total: '16000',
          index: 2
        }
      ],
      blah: ''
    };

    this.onPressItem = this.onPressItem.bind(this);
    this.closeConfirmModal = this.closeConfirmModal.bind(this);
    this.openModalOk = this.openModalOk.bind(this);
    this.closeModalOk = this.closeModalOk.bind(this);
  }

  async componentWillMount() {
    OneSignal.init('5ddb699b-6bc7-4ed3-aa25-28866f8784e4', { kOSSettingsKeyAutoPrompt: true });
    var providedConsent = await OneSignal.userProvidedPrivacyConsent();

    OneSignal.setLocationShared(true);
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
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);

    let maxIndex = 0;
    let maxOrdenDeCompra = 0;

    this.state.list.map((item, i) => {
      if (item.index > maxIndex) {
        maxIndex = item.index;
        maxOrdenDeCompra = item.nro + 1;
      }
    });

    let item = {
      name: 'Orden de compra #' + maxOrdenDeCompra,
      avatar_url: require('../images/sap.png'),
      nro: maxOrdenDeCompra,
      pos: '10',
      mat: 'escritorio zen4',
      qty: '5',
      unit: '3200',
      total: '16000',
      index: maxIndex + 1
    };
    this.setState({ modalOk: false, list: [...this.state.list, item] });
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  onPressItem(e) {
    this.setState({ modalConfirm: true, activeIndex: '0' });
  }

  closeConfirmModal() {
    this.setState({ modalConfirm: false });
  }

  openModalOk() {
    this.setState({ modalOk: true });
  }

  closeModalOk() {
    this.setState({ modalOk: false, modalConfirm: false });
  }

  keyExtractor = (item, index) => index;

  renderItem = ({ item, index }) => (
    <ListItem
      title={item.name}
      leftAvatar={{ source: item.avatar_url, rounded: true }}
      onPress={() => {
        this.setState({ activeIndex: item.index, modalConfirm: true });
      }}
    />
  );

  render() {
    var modalConfirm = this.state.modalConfirm;
    var modalOk = this.state.modalOk;

    return (
      <View style={{ flex: 1 }}>
        <FlatList keyExtractor={this.keyExtractor} data={this.state.list} renderItem={this.renderItem} />
        <Modal visible={modalConfirm} style={{ flex: 1 }} animationType="slide">
          {this.state.list.map(
            (item, i) =>
              this.state.activeIndex === item.index && (
                <View style={{ flex: 1 }}>
                  <Card title={'Orden de Transporte numero #' + item.nro} titleStyle={styles.cardTitle}>
                    <Text style={styles.textDetails}>Posicion: {item.pos}</Text>
                    <Text style={styles.textDetails}>Descripcion: {item.mat}</Text>
                    <Text style={styles.textDetails}>Cantidad: {item.qty}</Text>
                    <Text style={styles.textDetails}>Precio por Unidad: {item.unit}</Text>
                    <Text style={styles.textDetails}>Total: {item.total}</Text>
                  </Card>
                </View>
              )
          )}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-end',
              flex: 1,
              flexDirection: 'row',
              marginBottom: 25
            }}
          >
            <TouchableHighlight style={styles.buttonContainerModalConfirmar} onPress={this.openModalOk}>
              <Text style={styles.buttonText}>Liberar</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.buttonContainerModalRechazar} onPress={this.closeConfirmModal}>
              <Text style={styles.buttonText}>Rechazar</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.buttonContainerModalCancelar} onPress={this.closeConfirmModal}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableHighlight>
          </View>
        </Modal>
        <Modal visible={modalOk} animationType="slide">
          <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', marginLeft: 55 }}>
            <Icon style={{}} reverse name="ios-checkmark-circle-outline" type="ionicon" color="green" />
            <Text style={{ fontSize: 25 }}> Orden liberada satisfactoriamente</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 25 }}>
            <TouchableHighlight onPress={this.closeModalOk} style={styles.buttonContainerModalRechazar}>
              <Text style={styles.buttonText}>Salir</Text>
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
    );
  }
}

class SettingsScreen extends Component {
  constructor() {
    super();
    this.state = {
      list1: [
        {
          title: 'German Gonzalez'
        },
        {
          title: 'Cambiar contraseña'
        },
        {
          title: 'Notificaciones'
        }
      ]
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../images/profilePicture.png')}
            style={{ borderRadius: 180, width: 250, height: 250 }}
          />
        </View>
        <FlatList data={this.state.list1} renderItem={({ item, index }) => <ListItem title={item.title} chevron />} />

        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.popToTop()}>
          <Text style={styles.buttonText}>CERRAR SESION</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
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
    backgroundColor: 'rgb(17,48,81)',
    paddingVertical: 15,
    margin: 30,
    borderRadius: 5,
    elevation: 2 // Android
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700'
  },
  textDetails: {
    //color: '#fff',
    fontWeight: '400',
    //textAlign: 'center',
    //justifyContent: 'center',
    fontSize: 22
  },
  cardTitle: {
    color: 'rgb(17,48,81)',
    fontSize: 24,
    fontWeight: '600',
    backgroundColor: '#ffffff'
  },
  buttonContainerModalConfirmar: {
    backgroundColor: '#0d47a1',
    paddingVertical: 15,
    width: 90,
    marginRight: 4,
    borderRadius: 5,
    elevation: 2 // Android
  },
  buttonContainerModalRechazar: {
    backgroundColor: '#d32f2f',
    paddingVertical: 15,
    width: 90,
    borderRadius: 5,
    elevation: 2 // Android
  },
  buttonContainerModalCancelar: {
    backgroundColor: '#333',
    paddingVertical: 15,
    width: 90,
    marginLeft: 4,
    borderRadius: 5,
    elevation: 2 // Android
  }
};

//Home
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  {
    //headerMode: 'none',
    navigationOptions: {
      headerTitle: 'Ordenes de compra pendientes',
      headerStyle: {
        backgroundColor: '#fff'
      },
      headerTintColor: '#205791'
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
      headerTintColor: '#205791'
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
      activeTintColor: '#205791',
      //inactiveTintColor: '#0c223a',
      style: {
        backgroundColor: '#fff'
      }
    }
  }
);
