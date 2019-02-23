import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import colors from '../theme';

export default class City extends Component {
  static navigationOptions = (props) => ({
    title: props.navigation.state.params.city.city,
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: '400'
    }
  });

  state = {
    name: '',
    info: ''
  }

  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  }

  addLocation = () => {
    const { name, info } = this.state;
    if (name === '' || info === '') return
    const { city } = this.props.navigation.state.params;
    const location = {
      name,
      info
    }
    this.props.screenProps.addLocation(location, city);
    this.setState({
      name: '',
      info: ''
    })
  }

  render() {
    console.log(this.props);
    const { city } = this.props.navigation.state.params;
    return (
      
      <View style={styles.container}>
        <ScrollView>
          {
            city.locations.map((location, index) => (
              <View style={styles.locationContainer} key={index.toString()}>
                <Text style={styles.locationName}>{location.name}</Text>
                <Text style={styles.locationInfo}>{location.info}</Text>
              </View>
            ))
          }
        </ScrollView>
        <TextInput
          value={this.state.name}
          placeholder='Location name'
          onChangeText={(val) => this.onChangeText('name', val)}
          style={styles.input}
          placeholderTextColor="#fff"
        />
        <TextInput
          value={this.state.info}
          placeholder='Location info'
          onChangeText={(val) => this.onChangeText('info', val)}
          style={[styles.input, styles.info]}
          placeholderTextColor="#fff"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.addLocation}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Add Location</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    locationContainer: {
      padding: 10,
      borderBottomColor: colors.primary,
      borderBottomWidth: 2
    },
    locationName: {
      fontSize: 20
    },
    info: {
      color: 'rgba(0,0,0,.5)'
    },
    input: {
      position: 'absolute',
      height: 50,
      backgroundColor: colors.primary,
      width: '100%',
      padding: 10,
      bottom: 104,
      left: 0,
      color: '#fff'
    },
    info: {
      bottom: 52,
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
      backgroundColor: colors.primary,
    },
    button: {

    },
    buttonText: {
      color: '#fff',
      fontSize: 20
    }
})
