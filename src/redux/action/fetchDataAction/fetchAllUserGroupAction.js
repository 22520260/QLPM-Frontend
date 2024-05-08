import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../setup/axios';

export const fetchAllUserGroupAction = createAsyncThunk(
  'fetchAllUserGroupAction',
  async () => {
    try {
      const response = await axios.get('/admin/getAllUserGroup');
      return response.data; 
    } catch (error) {
      return error.message;
    }
  }
);
