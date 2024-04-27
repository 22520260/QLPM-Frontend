import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllBenhNhanAction = createAsyncThunk(
  'fetchAllBenhNhanAction',
  async () => {
    try {
      console.log('fetchAllBenhNhan')
      const response = await axios.get('http://localhost:3001/benhnhan');
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
