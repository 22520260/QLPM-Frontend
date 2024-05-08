import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../setup/axios';

export const fetchAllAccountAction = createAsyncThunk(
  'fetchAllAccount',
  async () => {
    try {
      const response = await axios.get('/admin/getAllAccount');
      return response.data; 
    } catch (error) {
      return error.message;
    }
  }
);
