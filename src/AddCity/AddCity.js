import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import uuid from 'uuid';
import colors from '../theme';

export default class AddCity extends Component {
  constructor(props) {
    super(props);
    this.state={
      city: '',
      country: ''
    }
  }

  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  }

  submit = () => {
    const { country, city } = this.state;
    if (city === '' || country === '') return
    const City = {
      id: uuid(),
      city,
      country,
      locations: []
    }
    this.props.screenProps.addCity(City);
    this.setState({
      city: '',
      country: ''
    }, () => {
      this.props.navigation.navigate('Cities');
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Cities App</Text>
        <TextInput
          style={styles.input}
          placeholder='City name'
          value={this.state.city}
          onChangeText={val => this.onChangeText('city', val)}
        />
        <TextInput
         style={styles.input}
         placeholder='Country name'
         value={this.state.country}
         onChangeText={val => this.onChangeText('country', val)}
        />
        <TouchableOpacity onPress={this.submit}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Add City</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center'
  },
  input: {
    backgroundColor: '#fff',
    margin: 10,
    paddingHorizontal: 8,
    height: 50
  },
  button: {
    height: 50,
    backgroundColor: '#363636',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  buttonText: {
    color: '#fff'
  },
  heading: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    color: '#fff'
  }
});
