import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../setup/axios';

export const fetchUserAccountAction = createAsyncThunk(
  'auth/fetchUserAccount',
  async () => {
    const response = await axios.get('/account/getUserAccount');
    console.log('>>>>>> KHI GOI GETUSERACCOUNT response.data', response.data);
    return response.data;
  }
);