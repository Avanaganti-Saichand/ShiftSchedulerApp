import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, TextInput, ActivityIndicator} from 'react-native-paper';
import CustomButton from '../components/CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';
import colors from '../assets/colors';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Dashboard');
    }, 2000);
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
});

export default LoginScreen;
