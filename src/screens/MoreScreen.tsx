import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text, Avatar, List, Switch, Divider} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {FadeInUp} from 'react-native-reanimated';
import colors from '../assets/colors';

const MoreScreen: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  return (
    <View style={styles.container}>
      {/* Gradient Header */}
      <LinearGradient
        colors={[colors.backgroundStart, colors.backgroundEnd]}
        style={styles.header}>
        <Avatar.Image
          size={80}
          source={{uri: 'https://i.pravatar.cc/150?img=5'}}
        />
        <Text style={styles.headerText}>John Doe</Text>
        <Text style={styles.headerSubText}>johndoe@example.com</Text>
      </LinearGradient>

      <ScrollView>
        {/* Settings Options */}
        <Animated.View entering={FadeInUp.duration(500)}>
          <List.Section>
            <List.Subheader>Settings</List.Subheader>

            <List.Item
              title="Notifications"
              left={props => <List.Icon {...props} icon="bell" />}
              right={() => (
                <Switch
                  value={notificationsEnabled}
                  onValueChange={() =>
                    setNotificationsEnabled(!notificationsEnabled)
                  }
                />
              )}
            />
            <Divider />

            <List.Item
              title="Dark Mode"
              left={props => <List.Icon {...props} icon="theme-light-dark" />}
              right={() => (
                <Switch
                  value={darkModeEnabled}
                  onValueChange={() => setDarkModeEnabled(!darkModeEnabled)}
                />
              )}
            />
            <Divider />

            <List.Item
              title="Language"
              left={props => <List.Icon {...props} icon="translate" />}
              right={() => <Text style={styles.optionText}>English</Text>}
            />
          </List.Section>
        </Animated.View>

        {/* Help & About */}
        <Animated.View entering={FadeInUp.duration(700)}>
          <List.Section>
            <List.Subheader>Help & About</List.Subheader>

            <List.Item
              title="Support"
              left={props => <List.Icon {...props} icon="lifebuoy" />}
            />
            <Divider />

            <List.Item
              title="About App"
              left={props => (
                <List.Icon {...props} icon="information-outline" />
              )}
            />
            <Divider />

            <List.Item
              title="Logout"
              left={props => (
                <List.Icon {...props} icon="logout" color={colors.danger} />
              )}
              titleStyle={{color: colors.danger}}
              onPress={() => console.log('Logged out')}
            />
          </List.Section>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cardBackground,
  },
  header: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: 10,
  },
  headerSubText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  optionText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default MoreScreen;
