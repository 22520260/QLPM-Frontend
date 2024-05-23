import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../setup/axios';

export const fetchThongKeThuocAction = createAsyncThunk(
  'fetchThongKeThuocAction',
  async () => {
    try {
      const response = await axios.get('/thongke/thuoc');
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
