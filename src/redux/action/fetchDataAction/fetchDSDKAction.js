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

export const fetchPkByIdHdAction = createAsyncThunk(
  'fetchPkByIdHdAction',
  async (maHD, {meta}) => {
    try {
      const response = await axios.get(`/phieukham/dspk/${maHD}`);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
