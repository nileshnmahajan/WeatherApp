import React, {Component} from 'react';
import {Text, View, StatusBar, SafeAreaView} from 'react-native';
import {colors, strings} from '../common';
class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: 'white',
        }}>
        <StatusBar backgroundColor="white" />
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: 30,
            color: colors.green,
            fontWeight: 'bold',
          }}>
          {strings.splashText}
        </Text>
      </SafeAreaView>
    );
  }
}

export default Splash;
