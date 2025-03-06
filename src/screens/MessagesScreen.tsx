import React, {useState} from 'react';
import {View, StyleSheet, FlatList, TextInput, Pressable} from 'react-native';
import {Text, Avatar, Card, IconButton} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import colors from '../assets/colors';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const messages = [
  {
    id: '1',
    name: 'Ken Roanhorse',
    message: 'Thanks for the update!',
    date: '24 Feb',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Dezzy',
    message: 'See you at 6 PM!',
    date: '28 Feb',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    name: 'Zeke Ivery',
    message: 'Shift changed to 8 AM.',
    date: '1 Feb',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
];

const MessagesScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const scaleSearch = useSharedValue(1);
  const animatedSearchStyle = useAnimatedStyle(() => ({
    transform: [{scale: scaleSearch.value}],
  }));

  const renderRightActions = (_id: string) => (
    <View style={styles.swipeActions}>
      <IconButton
        icon={() => (
          <MaterialCommunityIcons
            name="pin-outline"
            size={24}
            color={colors.primary}
          />
        )}
      />
      <IconButton
        icon={() => (
          <MaterialCommunityIcons
            name="archive-outline"
            size={24}
            color={colors.warning}
          />
        )}
      />
      <IconButton
        icon={() => (
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={24}
            color={colors.danger}
          />
        )}
      />
    </View>
  );

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        {/* Gradient Header */}
        <LinearGradient
          colors={[colors.backgroundStart, colors.backgroundEnd]}
          style={styles.header}>
          <Text style={styles.headerText}>Messages</Text>
        </LinearGradient>

        {/* Search Bar with Animation */}
        <Pressable
          onPressIn={() => (scaleSearch.value = withSpring(1.05))}
          onPressOut={() => (scaleSearch.value = withSpring(1))}>
          <Animated.View style={[styles.searchContainer, animatedSearchStyle]}>
            <TextInput
              placeholder="Search messages..."
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </Animated.View>
        </Pressable>

        {/* Messages List with Reanimated Swipeable */}
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          contentContainerStyle={{padding: 16}}
          renderItem={({item, index}) => (
            <Swipeable renderRightActions={() => renderRightActions(item.id)}>
              <Animated.View>
                <Animated.View
                  entering={FadeInUp.delay(index * 100).duration(500)}>
                  <Card style={styles.messageCard}>
                    <Card.Title
                      title={item.name}
                      subtitle={item.message}
                      left={props => (
                        <Avatar.Image
                          {...props}
                          size={45}
                          source={{uri: item.avatar}}
                        />
                      )}
                      right={() => <Text style={styles.date}>{item.date}</Text>}
                    />
                  </Card>
                </Animated.View>
              </Animated.View>
            </Swipeable>
          )}
        />
      </View>
    </GestureHandlerRootView>
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
  searchContainer: {
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  searchInput: {
    backgroundColor: colors.inputBackground,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  messageCard: {
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 4,
    padding: 10,
  },
  date: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  swipeActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
});

export default MessagesScreen;
