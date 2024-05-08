import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../setup/axios';

export const fetchAllBacSiAction = createAsyncThunk(
  'fetchAllBacSi',
  async () => {
    try {
      const response = await axios.get('/bacsi/getAll');
      return response.data; 
    } catch (error) {
      return error.message;
    }
  }
);
