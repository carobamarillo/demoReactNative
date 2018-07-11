import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchPeople } from '../../actions/tabnavigation_action';

class DetailsScreen extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white' }}>
        <View>
          <FlatList
            //ListHeaderComponent={<Text style={{ fontSize: 14 }}>Inicio. Contador: {this.props.tabnavi.count1}</Text>}
            data={this.props.tabnavi.people}
            renderItem={({ item }) =>
              this.props.tabnavi.people.map((item, i) => (
                <ListItem key={i} title={item.name.first} subtitle={item.email} />
              ))
            }
            // ListFooterComponent={<Text>Fin de Pagina</Text>}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return state;
}
export default connect(
  mapStateToProps,
  { fetchPeople }
)(DetailsScreen);
