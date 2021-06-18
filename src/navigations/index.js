import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {colors, strings} from '../common';
const Stack = createStackNavigator();

import Cities from '../screens/Cities';
import Map from '../screens/Map';

class Navigation extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator mode="model" headerMode="none">
          <Stack.Screen
            name="home"
            component={Cities}
            options={{
              title: strings.citiesScreenTitle,
            }}
          />
          <Stack.Screen
            name="map"
            component={Map}
            options={{
              title: strings.mapScreenTitle,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Navigation;
