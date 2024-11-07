import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RootNavigation from './src/navigations/appNavigators/rootNavigation'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <RootNavigation />
  )
}

export default App
