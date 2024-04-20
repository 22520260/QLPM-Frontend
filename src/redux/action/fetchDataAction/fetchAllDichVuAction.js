import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllDichVuAction = createAsyncThunk(
  'fetchAllDichVuAction',
  async () => {
    try {
      console.log('fetchAllDichVu')
      const response = await axios.get('http://localhost:3001/service');
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
