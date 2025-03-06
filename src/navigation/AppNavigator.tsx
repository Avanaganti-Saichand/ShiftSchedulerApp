import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {BottomNavigation} from 'react-native-paper';
import DashboardScreen from '../screens/DashboardScreen';
import ShiftsScreen from '../screens/ShiftsScreen';
import MessagesScreen from '../screens/MessagesScreen';
import MoreScreen from '../screens/MoreScreen';
import colors from '../assets/colors';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

// Define tab routes
const DashboardRoute = () => <DashboardScreen />;
const ShiftsRoute = () => <ShiftsScreen />;
const MessagesRoute = () => <MessagesScreen />;
const MoreRoute = () => <MoreScreen />;

// Bottom Navigation Component
const BottomTabs: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'dashboard',
      title: 'Dashboard',
      focusedIcon: 'view-dashboard',
      unfocusedIcon: 'view-dashboard-outline',
    },
    {
      key: 'shifts',
      title: 'Shifts',
      focusedIcon: 'calendar',
      unfocusedIcon: 'calendar-outline',
    },
    {
      key: 'messages',
      title: 'Messages',
      focusedIcon: 'message',
      unfocusedIcon: 'message-outline',
    },
    {
      key: 'more',
      title: 'More',
      focusedIcon: 'dots-horizontal',
      unfocusedIcon: 'dots-horizontal-circle-outline',
    },
  ]);

  const tabScale = useSharedValue(1);

  const animatedTabStyle = useAnimatedStyle(() => ({
    transform: [{scale: tabScale.value}],
  }));

  return (
    <View style={styles.container}>
      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={newIndex => {
          tabScale.value = withTiming(1.2, {duration: 150});
          setTimeout(
            () => (tabScale.value = withTiming(1, {duration: 150})),
            150,
          );
          setIndex(newIndex);
        }}
        renderScene={BottomNavigation.SceneMap({
          dashboard: DashboardRoute,
          shifts: ShiftsRoute,
          messages: MessagesRoute,
          more: MoreRoute,
        })}
        shifting={true}
        barStyle={styles.bottomBar}
        activeColor={colors.primary}
        inactiveColor={colors.textSecondary}
      />
    </View>
  );
};

// Stack Navigator for Smooth Transitions
const StackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      ...TransitionPresets.SlideFromRightIOS, // Adds sliding animation
    }}>
    <Stack.Screen name="MainTabs" component={BottomTabs} />
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen name="More" component={MoreScreen} />
  </Stack.Navigator>
);

// Root Navigator
const AppNavigator = () => (
  <NavigationContainer>
    <StackNavigator />
  </NavigationContainer>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomBar: {
    backgroundColor: colors.cardBackground,
    elevation: 4,
  },
});

export default AppNavigator;
