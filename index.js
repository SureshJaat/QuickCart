/* eslint-disable react/react-in-jsx-scope */
/**
 * @format
 */

import { AppRegistry, Text, LogBox, ActivityIndicator } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';

import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import { persistor, store } from './src/redux/store/store';
import colors from './src/styles/colors';


const RNRedux = () => (
  <Provider store={store}>
    <PersistGate loading={
      <ActivityIndicator size="large" color={colors.freshGreen} />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);


Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

AppRegistry.registerComponent(appName, () => RNRedux);
