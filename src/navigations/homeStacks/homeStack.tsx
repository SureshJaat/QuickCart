import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from '../tabNavigators/tabNavigator';

const Stack = createNativeStackNavigator();


const HomeStack = () => {

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false,}}
      initialRouteName="TabNavigator">
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default HomeStack;
