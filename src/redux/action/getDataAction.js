import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchData = createAsyncThunk(
  'data/fetch', // Tên của action
  async (apiUrl, thunkAPI) => {
    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
