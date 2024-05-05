import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../setup/axios';

export const fetchUserAccountAction = createAsyncThunk(
  'auth/fetchUserAccount',
  async () => {
    const response = await axios.get('/account/getUserAccount');
    return response.data;
  }
);