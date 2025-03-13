import api from './api';
import API_ENDPOINTS from '../constants/apiEndpoints';

const ShiftService = {
  // 🔹 Fetch all shifts
  getAllShifts: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.SHIFTS.GET_ALL);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 🔹 Claim a shift
  claimShift: async (shiftId: number) => {
    try {
      const response = await api.put(API_ENDPOINTS.SHIFTS.CLAIM(shiftId));
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 🔹 Create a new shift (Admin)
  createShift: async (
    title: string,
    startTime: string,
    endTime: string,
    assignedTo: number | null,
  ) => {
    try {
      const response = await api.post(API_ENDPOINTS.SHIFTS.CREATE, {
        title,
        startTime,
        endTime,
        assignedTo,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default ShiftService;
