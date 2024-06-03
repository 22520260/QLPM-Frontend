import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../setup/axios';

export const fetchAllDVTAction = createAsyncThunk(
  'fetchAllDVTAction',
  async () => {
    try {
      const response = await axios.get('/dvt/getAll');
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
