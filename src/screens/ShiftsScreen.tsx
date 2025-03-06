import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Pressable} from 'react-native';
import {Text, Card, Chip, Avatar} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import colors from '../assets/colors';

const shifts = [
  {
    id: '1',
    title: 'Morning Shift',
    time: '8:00 AM - 4:00 PM',
    type: 'morning',
    icon: 'weather-sunset-up',
  },
  {
    id: '2',
    title: 'Evening Shift',
    time: '4:00 PM - 12:00 AM',
    type: 'evening',
    icon: 'weather-sunset-down',
  },
  {
    id: '3',
    title: 'Night Shift',
    time: '12:00 AM - 8:00 AM',
    type: 'night',
    icon: 'weather-night',
  },
];

const ShiftsScreen: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Move shared values outside of loops
  const scaleChip = useSharedValue(1);
  const scaleCard = useSharedValue(1);

  const filteredShifts =
    selectedFilter === 'All'
      ? shifts
      : shifts.filter(shift => shift.type === selectedFilter.toLowerCase());

  const animatedChipStyle = useAnimatedStyle(() => ({
    transform: [{scale: scaleChip.value}],
  }));

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{scale: scaleCard.value}],
  }));

  return (
    <View style={styles.container}>
      {/* Gradient Header */}
      <LinearGradient
        colors={[colors.backgroundStart, colors.backgroundEnd]}
        style={styles.header}>
        <Text style={styles.headerText}>Shifts</Text>
      </LinearGradient>

      {/* Filter Chips with Enhanced Feedback */}
      <View style={styles.filters}>
        {['All', 'Morning', 'Evening', 'Night'].map(filter => (
          <Pressable
            key={filter}
            onPress={() => {
              setSelectedFilter(filter);
              scaleChip.value = withSpring(1.1, {damping: 10, stiffness: 100});
              setTimeout(() => (scaleChip.value = withSpring(1)), 200);
            }}>
            <Animated.View style={animatedChipStyle}>
              <Chip
                selected={selectedFilter === filter}
                style={[
                  styles.chip,
                  selectedFilter === filter && styles.chipSelected,
                ]}>
                {filter}
              </Chip>
            </Animated.View>
          </Pressable>
        ))}
      </View>

      {/* Shift List with Animated Cards & Icons */}
      <FlatList
        data={filteredShifts}
        keyExtractor={item => item.id}
        contentContainerStyle={{padding: 16}}
        renderItem={({item, index}) => (
          <Pressable
            onPressIn={() => (scaleCard.value = withSpring(0.97))}
            onPressOut={() => (scaleCard.value = withSpring(1))}>
            <Animated.View
              entering={FadeInUp.delay(index * 100).duration(500)}
              style={animatedCardStyle}>
              <Card
                style={[
                  styles.shiftCard,
                  {borderLeftColor: colors[`${item.type}Shift`]},
                ]}>
                <Card.Title
                  title={item.title}
                  subtitle={item.time}
                  left={props => (
                    <Avatar.Icon
                      {...props}
                      icon={item.icon}
                      style={{backgroundColor: colors[`${item.type}Shift`]}}
                    />
                  )}
                />
              </Card>
            </Animated.View>
          </Pressable>
        )}
      />
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
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  chip: {
    marginHorizontal: 5,
  },
  chipSelected: {
    backgroundColor: colors.primary,
  },
  shiftCard: {
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 4,
    borderLeftWidth: 5, // Adds color indicator on the left
    padding: 10,
  },
});

export default ShiftsScreen;
