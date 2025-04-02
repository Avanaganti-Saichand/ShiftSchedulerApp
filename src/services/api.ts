import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://192.168.1.206:5000'; // ✅ Your IP

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔐 Attach Authorization Token Automatically
api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// ⚠️ Global Error Handling with Auto Logout
api.interceptors.response.use(
  response => response,
  async error => {
    const status = error.response?.status;
    const errMsg = error.response?.data?.error;

    // ✅ Auto logout on invalid or expired token
    if (status === 401 || errMsg === 'Invalid token') {
      await AsyncStorage.removeItem('authToken'); // Clear bad token
      console.warn('🔐 Token invalid or expired. Logging out...');
    }

    console.error('API Error:', errMsg || error.message);
    return Promise.reject(error);
  },
);

export default api;
