import api from './api';
import API_ENDPOINTS from '../constants/apiEndpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthService = {
  // 🔹 Login User
  login: async (username: string, password: string) => {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, {
        username,
        password,
      });
      if (response.data.token) {
        await AsyncStorage.setItem('authToken', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 🔹 Get User Profile
  getUser: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.AUTH.GET_USER);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 🔹 Logout User
  // 🔹 Logout User (with API Call and Proper Error Handling)
  logout: async () => {
    try {
      // 🔹 If backend has a logout API, call it (optional)
      await api.post(API_ENDPOINTS.AUTH.LOGOUT);

      // ✅ Remove token from storage
      await AsyncStorage.removeItem('authToken');

      console.log('✅ Logout successful. Token removed.');
      return {success: true};
    } catch (error: any) {
      console.error(
        '❌ Logout failed:',
        error?.response?.data || error.message,
      );
      return {
        success: false,
        error: error?.response?.data?.error || 'Logout failed',
      };
    }
  },
};

export default AuthService;
