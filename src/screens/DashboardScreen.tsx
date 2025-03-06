import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Text, Card, Avatar, FAB} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {FadeInUp} from 'react-native-reanimated';
import colors from '../assets/colors';

const shifts = [
  {id: '1', title: 'Morning Shift', time: '8:00 AM - 4:00 PM'},
  {id: '2', title: 'Evening Shift', time: '4:00 PM - 12:00 AM'},
  {id: '3', title: 'Night Shift', time: '12:00 AM - 8:00 AM'},
];

const DashboardScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Gradient Header */}
      <LinearGradient
        colors={[colors.backgroundStart, colors.backgroundEnd]}
        style={styles.header}>
        <Avatar.Image
          size={60}
          source={{uri: 'https://i.pravatar.cc/150?img=3'}}
        />
        <Text style={styles.headerText}>Welcome, User</Text>
        <Text style={styles.headerSubText}>Your upcoming shifts</Text>
      </LinearGradient>

      {/* Shift List with Animated Cards */}
      <FlatList
        data={shifts}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.contentContainer} // Fixed
        renderItem={({item, index}) => (
          <Animated.View entering={FadeInUp.delay(index * 100).duration(500)}>
            <Card style={styles.shiftCard}>
              <Card.Title
                title={item.title}
                subtitle={item.time}
                left={props => <Avatar.Icon {...props} icon="clock-outline" />}
              />
            </Card>
          </Animated.View>
        )}
      />

      {/* Floating Action Button for Quick Actions */}
      <FAB
        icon="plus"
        style={styles.fab}
        color="white"
        onPress={() => console.log('Add Shift')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cardBackground,
  },
  contentContainer: {
    padding: 16,
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
    fontSize: 16,
    color: colors.textPrimary,
  },
  shiftCard: {
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 4, // Adds shadow
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: colors.fabBackground,
  },
});

export default DashboardScreen;
