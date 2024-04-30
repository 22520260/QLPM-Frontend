import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../setup/axios';

export const fetchDSDKAction = createAsyncThunk(
  'fetchDSDKAction',
  async () => {
    try {
      const response = await axios.get('/phieukham/dsdk');
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
