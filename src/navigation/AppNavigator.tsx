import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthNavigator from './AuthNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import colors from '../assets/colors';
import NAVIGATION_ENDPOINTS from '../constants/navigationEndpoints';

// Create Stack Navigator
const Stack = createStackNavigator();

// ✅ Root Navigator (Handles Authentication)
const AppNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // 🔹 Check Authentication Status
  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      setIsAuthenticated(!!token); // Convert token existence to boolean
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();

    // ✅ Listen for authentication changes
    const authListener = setInterval(() => {
      checkAuthStatus();
    }, 1000); // Check every second (better alternative: event-based)

    return () => clearInterval(authListener); // Cleanup
  }, []);

  if (isAuthenticated === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isAuthenticated ? (
          <Stack.Screen
            name={NAVIGATION_ENDPOINTS.STACKS.BOTTOM_TABS}
            component={BottomTabNavigator}
          />
        ) : (
          <Stack.Screen
            name={NAVIGATION_ENDPOINTS.STACKS.AUTH_STACK}
            component={AuthNavigator}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppNavigator;
