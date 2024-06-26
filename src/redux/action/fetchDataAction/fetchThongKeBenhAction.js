import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../setup/axios';

export const fetchThongKeBenhAction = createAsyncThunk(
  'fetchThongKeBenhAction',
  async () => {
    try {
      const response = await axios.get('/thongke/benh');
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
