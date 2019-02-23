import React, {Component} from 'react';
import {
  AsyncStorage
} from 'react-native';
import Tabs from './src';

const key = 'cities'

export default class App extends Component {
  state = {
    cities: [],
  }

  async componentDidMount() {
    try {
      const cities = await AsyncStorage.getItem(key);
      this.setState({ 
        cities: JSON.parse([cities])
       });
    } catch (error) {
      console.log('Error', error);
    }
  }

  addCity = (city) => {
    const { cities } = this.state;
    cities.push(city);
    AsyncStorage.setItem(key, JSON.stringify(cities))
      .then(() => console.log('Item stored'))
      .catch(err => console.log('Error', err))
    this.setState({ cities })
  }

  addLocation = (location, city) => {
    const index = this.state.cities.findIndex(item => item.id === city.id);
    const chosenCity = this.state.cities[index];
    chosenCity.locations.push(location);
    const cities = [
      ...this.state.cities.slice(0, index),
      chosenCity,
      ...this.state.cities.slice(index+1)
    ]
    this.setState({ cities },
      () => {
        AsyncStorage.setItem(key, JSON.stringify(cities))
        .then(() => console.log('Item stored'))
        .catch(err => console.log('Error', err))
      })
  }

  render() {
    const { cities } = this.state;
    return (
      <Tabs 
        screenProps={{
          cities,
          addCity: this.addCity,
          addLocation: this.addLocation
        }}
      />
    );
  }
}
