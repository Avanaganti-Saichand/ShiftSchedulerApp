const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    GET_USER: '/auth/me',
  },
  SHIFTS: {
    GET_ALL: '/shifts',
    GET_USER_DASHBOARD: '/shifts/user-dashboard', // ✅ NEW
    CREATE: '/shifts',
    UPDATE: (id: number) => `/shifts/${id}`,
    DELETE: (id: number) => `/shifts/${id}`,
    CLAIM: (id: number) => `/shifts/claim/${id}`,
  },
  MESSAGES: {
    GET_ALL: '/messages',
    SEND: '/messages',
    DELETE: (id: number) => `/messages/${id}`,
  },
};

export default API_ENDPOINTS;
