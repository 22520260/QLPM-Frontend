import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../setup/axios';

export const fetchAllDichVuAction = createAsyncThunk(
  'fetchAllDichVuAction',
  async () => {
    try {
      console.log('fetchAllDichVu')
      const response = await axios.get('/dichvu/getAll');
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
