import React from 'react';

import {Provider as ReduxProvider} from 'react-redux';
import reducer from './src/redux/reducer';

import {createStore} from 'redux';

const store = createStore(reducer);

import {AppRegistry} from 'react-native';
import Navigation from './src/navigations';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

export default function Main() {
  return (
    <ReduxProvider store={store}>
      <Navigation />
    </ReduxProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
