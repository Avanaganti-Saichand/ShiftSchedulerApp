import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import NAVIGATION_ENDPOINTS from '../constants/navigationEndpoints';

const Stack = createStackNavigator();

// ✅ Authentication Stack (Login Screen)
const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen
      name={NAVIGATION_ENDPOINTS.AUTH.LOGIN}
      component={LoginScreen}
    />
  </Stack.Navigator>
);

export default AuthNavigator;
