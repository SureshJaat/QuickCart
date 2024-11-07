// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from '../homeStacks/homeStack';



function RootNavigation() {
  return (
    <NavigationContainer>
       <HomeStack/>
    </NavigationContainer>
  );
}

export default RootNavigation;
