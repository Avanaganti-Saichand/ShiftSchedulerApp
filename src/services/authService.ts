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
  logout: async () => {
    try {
      await AsyncStorage.removeItem('authToken');
    } catch (error) {
      throw error;
    }
  },
};

export default AuthService;
