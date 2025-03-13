import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/DashboardScreen';
import ShiftsScreen from '../screens/ShiftsScreen';
import MessagesScreen from '../screens/MessagesScreen';
import MoreScreen from '../screens/MoreScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../assets/colors';
import NAVIGATION_ENDPOINTS from '../constants/navigationEndpoints';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (routeName: string, color: string, size: number) => {
  let iconName;
  switch (routeName) {
    case NAVIGATION_ENDPOINTS.MAIN.DASHBOARD:
      iconName = 'view-dashboard';
      break;
    case NAVIGATION_ENDPOINTS.MAIN.SHIFTS:
      iconName = 'calendar';
      break;
    case NAVIGATION_ENDPOINTS.MAIN.MESSAGES:
      iconName = 'message';
      break;
    case NAVIGATION_ENDPOINTS.MAIN.MORE:
      iconName = 'dots-horizontal';
      break;
    default:
      iconName = 'circle';
  }
  return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
};

const BottomTabNavigator = () => (
  <Tab.Navigator
    initialRouteName={NAVIGATION_ENDPOINTS.MAIN.DASHBOARD}
    screenOptions={({route}) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textSecondary,
      tabBarStyle: {backgroundColor: colors.cardBackground},
      tabBarIcon: ({color, size}) => getTabBarIcon(route.name, color, size),
    })}>
    <Tab.Screen
      name={NAVIGATION_ENDPOINTS.MAIN.DASHBOARD}
      component={DashboardScreen}
    />
    <Tab.Screen
      name={NAVIGATION_ENDPOINTS.MAIN.SHIFTS}
      component={ShiftsScreen}
    />
    <Tab.Screen
      name={NAVIGATION_ENDPOINTS.MAIN.MESSAGES}
      component={MessagesScreen}
    />
    <Tab.Screen name={NAVIGATION_ENDPOINTS.MAIN.MORE} component={MoreScreen} />
  </Tab.Navigator>
);

export default BottomTabNavigator;
