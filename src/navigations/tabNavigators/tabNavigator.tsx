import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale } from '../../styles/responsive';
import colors from '../../styles/colors';
import HomeScreen from '../../screens/home';
import BottomTabBar from '../../components/bottomTabBar';
import CartTab from '../../screens/cartTab';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {

  return (
    <Tab.Navigator
      tabBar={(props: any) => <BottomTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: colors.freshGreen,
        tabBarInactiveTintColor: '#282A33',
        headerShown: false,
        unmountOnBlur: true,
      }}
    >
      <Tab.Screen
        name="Home"
        options={{ unmountOnBlur: false }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="CartTab"
        options={{ unmountOnBlur: false }}
        component={CartTab}
      />

    </Tab.Navigator>
  );
};


export default TabNavigator;
