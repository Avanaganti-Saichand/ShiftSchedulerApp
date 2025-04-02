import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, RefreshControl, Alert} from 'react-native';
import {Text, Card, Avatar, FAB, ActivityIndicator} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {FadeInUp} from 'react-native-reanimated';
import colors from '../assets/colors';
import ShiftService from '../services/shiftService';

const DashboardScreen: React.FC = () => {
  interface Shift {
    id: number;
    title: string;
    start_time: string;
    end_time: string;
  }

  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false); // ✅ New state to track admin

  // 🔹 Fetch shifts from API
  const fetchShifts = async () => {
    try {
      setLoading(true);
      const response = await ShiftService.getUserDashboard(); // ✅ Correct API call
      console.log('🔹 API Response:', response);

      setShifts(response.assignedShifts || []);
      setRole(response.role);
      setIsAdmin(response.role === 'admin'); // ✅ Determine if user is admin
    } catch (error: any) {
      console.error('❌ Failed to fetch shifts:', error.message);
      Alert.alert(
        'Error',
        error.response?.data?.error || 'Failed to load shifts.',
      );
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch shifts on mount
  useEffect(() => {
    fetchShifts();
  }, []);

  // 🔹 Handle pull-to-refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchShifts();
    setRefreshing(false);
  };

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
        <Text style={styles.headerText}>
          {role
            ? `Welcome, ${role === 'admin' ? 'Admin!' : 'Employee!'}`
            : 'Loading...'}
        </Text>
        <Text style={styles.headerSubText}>
          {isAdmin ? 'Manage All Shifts' : 'Your Upcoming Shifts'}
        </Text>
      </LinearGradient>

      {/* 🔹 Show loading state */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={styles.loader}
        />
      ) : (
        <FlatList
          data={shifts}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          renderItem={({item, index}) => (
            <Animated.View entering={FadeInUp.delay(index * 100).duration(500)}>
              <Card style={styles.shiftCard}>
                <Card.Title
                  title={item.title}
                  subtitle={`${item.start_time} - ${item.end_time}`}
                  left={props => (
                    <Avatar.Icon {...props} icon="clock-outline" />
                  )}
                />
              </Card>
            </Animated.View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No shifts available</Text>
          }
        />
      )}

      {/* 🔹 Floating Action Button for Admins Only */}
      {isAdmin && (
        <FAB
          icon="plus"
          style={styles.fab}
          color="white"
          onPress={() => console.log('Admin Adding Shift')}
        />
      )}
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shiftCard: {
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 4,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 20,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: colors.fabBackground,
  },
});

export default DashboardScreen;
