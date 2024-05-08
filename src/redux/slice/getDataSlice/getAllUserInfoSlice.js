import { createSlice } from '@reduxjs/toolkit';
import { fetchAllUserInfoAction } from '../../action/fetchDataAction/fetchAllUserInfo';

const initialState = {
  info: [],
  loading: false,
};

const getUserInfoSlice = createSlice({
  name: 'info',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllUserInfoAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllUserInfoAction.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload;
      })
      .addCase(fetchAllUserInfoAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default getUserInfoSlice.reducer;
