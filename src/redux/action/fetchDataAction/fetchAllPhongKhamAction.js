import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../setup/axios';

export const fetchAllPhongKhamAction = createAsyncThunk(
  'fetchAllPhongKhamAction',
  async () => {
    try {
      const response = await axios.get('/phongkham/getAll');
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);