import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, ActivityIndicator, Snackbar} from 'react-native-paper';
import CustomButton from '../components/CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';
import colors from '../assets/colors';
import AuthService from '../services/authService';
import {useNavigation} from '@react-navigation/native'; // ✅ Import navigation
import {StackNavigationProp} from '@react-navigation/stack';
import NAVIGATION_ENDPOINTS from '../constants/apiEndpoints'; // ✅ Use navigation constants

// ✅ Define correct navigation type
type RootStackParamList = {
  BottomTabs: undefined;
  Auth: undefined;
};

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage(''); // Clear previous errors

    try {
      console.log('Logging in with:', {username, password});

      // 🔹 Call API for login
      const response = await AuthService.login(username, password);

      if (response?.token) {
        console.log('✅ Login successful. Navigating to BottomTabs...');
        console.log('🔑 Received token:', JSON.stringify(response));
        setLoading(false);
      } else {
        throw new Error(response?.error || 'Invalid response from server');
      }
    } catch (error: any) {
      setLoading(false);
      console.error('❌ Login failed:', error?.message || error);
      setErrorMessage(
        error?.response?.data?.error || 'Login failed. Please try again.',
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Gradient Header */}
      <LinearGradient
        colors={[colors.backgroundStart, colors.backgroundEnd]}
        style={styles.header}>
        <Animated.Text
          entering={FadeInDown.duration(500)}
          style={styles.headerText}>
          Welcome Back
        </Animated.Text>
      </LinearGradient>

      {/* Input Fields */}
      <Animated.View entering={FadeInUp.duration(700)}>
        <TextInput
          label="Username"
          mode="outlined"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
      </Animated.View>

      <Animated.View entering={FadeInUp.duration(800)}>
        <TextInput
          label="Password"
          mode="outlined"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
      </Animated.View>

      {/* Login Button with Loading */}
      <Animated.View entering={FadeInUp.duration(900)}>
        {loading ? (
          <ActivityIndicator animating={true} color="white" />
        ) : (
          <CustomButton title="Login" onPress={handleLogin} />
        )}
      </Animated.View>

      {/* Error Snackbar */}
      <Snackbar
        visible={!!errorMessage}
        onDismiss={() => setErrorMessage('')}
        duration={3000}
        style={styles.snackbar}>
        {errorMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'white',
  },
  snackbar: {
    backgroundColor: colors.danger,
  },
});

export default LoginScreen;
