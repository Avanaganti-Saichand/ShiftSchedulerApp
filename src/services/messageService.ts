import api from './api';
import API_ENDPOINTS from '../constants/apiEndpoints';

const MessageService = {
  // 🔹 Fetch messages
  getMessages: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.MESSAGES.GET_ALL);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 🔹 Send a new message
  sendMessage: async (sender: string, message: string) => {
    try {
      const response = await api.post(API_ENDPOINTS.MESSAGES.SEND, {
        sender,
        message,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 🔹 Delete a message
  deleteMessage: async (messageId: number) => {
    try {
      await api.delete(API_ENDPOINTS.MESSAGES.DELETE(messageId));
    } catch (error) {
      throw error;
    }
  },
};

export default MessageService;
