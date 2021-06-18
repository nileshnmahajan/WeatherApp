import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {colors, strings, assets} from '../common';
class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: colors.headerBackgroundColor,
          paddingHorizontal: 15,
          paddingVertical: 15,
        }}>
        <View style={{width: 25, height: 25}}>
          {this.props.navigation && (
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image
                source={assets.backArrow}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: colors.headerTextColor,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
        <Text
          style={{
            color: colors.headerTextColor,
            fontSize: 20,
            flex: 1,
            textAlign: 'center',
          }}>
          {this.props.pageTitle}
        </Text>
      </View>
    );
  }
}

export default Navigation;
