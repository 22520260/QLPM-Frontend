import { createSlice } from '@reduxjs/toolkit';
import { fetchThamSoAction } from '../../action/fetchDataAction/fetchThamSoAction';

const initialState = {
  data: [],
  isLoading: false,
};

const fetchThamSoSlice = createSlice({
  name: 'fetchThamSo',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchThamSoAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchThamSoAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchThamSoAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default fetchThamSoSlice.reducer;
