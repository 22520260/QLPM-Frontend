import { createSlice } from '@reduxjs/toolkit';
import { fetchThongKeThuocAction } from '../../action/fetchDataAction/fetchThongKeThuocAction';

const initialState = {
  data: [],
  isLoading: false,
};

const fetchThongKeThuocSlice = createSlice({
  name: 'fetchThongKeThuoc',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchThongKeThuocAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchThongKeThuocAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchThongKeThuocAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default fetchThongKeThuocSlice.reducer;
