import { createSlice } from '@reduxjs/toolkit';
import { fetchDSDKAction } from '../../action/fetchDataAction/fetchDSDKAction';

const initialState = {
  data: {},
  loading: false,
};

const fetchDSDKSlice = createSlice({
  name: 'DSDK',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDSDKAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDSDKAction.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDSDKAction.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default fetchDSDKSlice.reducer;
