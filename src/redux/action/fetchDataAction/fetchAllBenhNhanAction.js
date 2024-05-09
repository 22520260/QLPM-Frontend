import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../setup/axios';

export const fetchAllBenhNhanAction = createAsyncThunk(
  'fetchAllBenhNhanAction',
  async () => {
    try {
      const response = await axios.get('/benhnhan/getAll');
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const fetchBenhNhanByIdAction = createAsyncThunk(
  "fetchBenhNhanById",
  async (maBN, { meta }) => {
    try {
      const response = await axios.get(`/benhnhan/get-by-id/${maBN}`);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
