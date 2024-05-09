import { createSlice } from '@reduxjs/toolkit';
import { fetchDSDKAction, fetchPkByIdHdAction } from '../../action/fetchDataAction/fetchDSDKAction';

const initialState = {
  data: {},
  status: "",
  loading: false,
  pkByIdHd: []
};

const fetchDSDKSlice = createSlice({
  name: 'DSDK',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDSDKAction.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(fetchDSDKAction.fulfilled, (state, action) => {
        state.status = 'success';
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDSDKAction.rejected, (state) => {
        state.status = 'failed';
        state.loading = false;
      })
      .addCase(fetchPkByIdHdAction.fulfilled, (state, action) => {
        state.status = 'success';
        state.loading = false;
        state.pkByIdHd = action.payload.data;
      });
  },
});

export default fetchDSDKSlice.reducer;
