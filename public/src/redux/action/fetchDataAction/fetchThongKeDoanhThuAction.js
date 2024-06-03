import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../setup/axios';

export const fetchThongKeDoanhThuAction = createAsyncThunk(
  'fetchThongKeDoanhThuAction',
  async () => {
    try {
      const response = await axios.get('/thongke/doanhthu-luotkhach');
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
