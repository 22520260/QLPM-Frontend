import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../setup/axios';

export const fetchThongKeDichVuCLSAction = createAsyncThunk(
  'fetchThongKeDichVuCLSAction',
  async () => {
    try {
      const response = await axios.get('/thongke/dichvu/cls');
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
