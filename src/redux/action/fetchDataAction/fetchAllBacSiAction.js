import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllBacSiAction = createAsyncThunk(
  'fetchAllBacSi',
  async () => {
    try {
      console.log('fetchAllBacSi')
      const response = await axios.get('http://localhost:3001/doctor');
      return response.data; 
    } catch (error) {
      return error.message;
    }
  }
);
