import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDSDKAction = createAsyncThunk(
  'fetchDSDKAction',
  async () => {
    try {
      console.log('fetchDSDKAction')
      const response = await axios.get('http://localhost:3001/phieukham/dsdk');
      console.log(">>> CHECK RES", response.data)
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
