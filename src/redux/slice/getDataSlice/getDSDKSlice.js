import { createSlice } from '@reduxjs/toolkit';
import { fetchDSDKAction } from '../../action/fetchDataAction/fetchDSDKAction';

const initialState = {
  data: {},
  isLoading: false,
};

const fetchDSDKSlice = createSlice({
  name: 'DSDK',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDSDKAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDSDKAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchDSDKAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default fetchDSDKSlice.reducer;
