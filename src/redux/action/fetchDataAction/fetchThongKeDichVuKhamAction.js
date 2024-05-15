import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../setup/axios';

export const fetchThongKeDichVuKhamAction = createAsyncThunk(
  'fetchThongKeDichVuKhamAction',
  async () => {
    try {
      const response = await axios.get('/thongke/dichvu/tt-db');
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
