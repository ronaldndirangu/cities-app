import React, { Component } from 'react';
import { 
  createAppContainer, createStackNavigator, createBottomTabNavigator
} from 'react-navigation';
import { Icon } from 'react-native-elements';

import AddCity from './AddCity/AddCity';
import Cities from './Cities/Cities';
import City from './Cities/City';
import colors from './theme';

const CitiesStack = createStackNavigator({
  Cities: { screen: Cities },
  City: { screen: City }
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: colors.primary
    },
    headerTintColor: '#fff'
  }
});

const Tabs = createBottomTabNavigator({
  Cities: { 
    screen: CitiesStack,
    navigationOptions: {
      tabBarLabel: 'Cities',
      tabBarIcon: () => <Icon name="ios-map" type="ionicon" size={28} color={colors.primary} />
    }
  },
  AddCity: { 
    screen: AddCity ,
    navigationOptions: {
      tabBarLabel: 'AddCity',
      tabBarIcon: () => <Icon name="ios-add-circle-outline" type="ionicon" size={28} color={colors.primary} />
    }
  }
});

export default createAppContainer(Tabs);
