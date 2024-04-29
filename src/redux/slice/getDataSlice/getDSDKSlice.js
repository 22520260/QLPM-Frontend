import { createSlice } from '@reduxjs/toolkit';
import { fetchDSDKAction } from '../../action/fetchDataAction/fetchDSDKAction';

const initialState = {
  data: {},
  status: "",
  loading: false,
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
      });
  },
});

export default fetchDSDKSlice.reducer;
