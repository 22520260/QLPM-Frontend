import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../setup/axios';

export const fetchAllUserInfoAction = createAsyncThunk(
  'auth/fetchAllUserInfo',
  async () => {
    const response = await axios.get('/account/getUserInfo');
    return response.data;
  }
);