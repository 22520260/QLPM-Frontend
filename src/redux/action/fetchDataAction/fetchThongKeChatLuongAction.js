import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../setup/axios';

export const fetchThongKeChatLuongAction = createAsyncThunk(
  'fetchThongKeChatLuongAction',
  async () => {
    try {
      const response = await axios.get('/thongke/chatluong');
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
