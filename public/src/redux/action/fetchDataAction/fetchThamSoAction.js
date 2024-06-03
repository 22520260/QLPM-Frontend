import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../setup/axios';

export const fetchThamSoAction = createAsyncThunk(
  'fetchThamSo',
  async () => {
    try {
      const response = await axios.get('/admin/getThamSo');
      return response.data; 
    } catch (error) {
      return error.message;
    }
  }
);
