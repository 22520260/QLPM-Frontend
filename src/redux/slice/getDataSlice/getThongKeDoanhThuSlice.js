import { createSlice } from '@reduxjs/toolkit';
import { fetchThongKeDoanhThuAction } from '../../action/fetchDataAction/fetchThongKeDoanhThuAction';

const initialState = {
  data: [],
  isLoading: false,
};

const fetchThongKeDoanhThuSlice = createSlice({
  name: 'fetchThongKeDoanhThu',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchThongKeDoanhThuAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchThongKeDoanhThuAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchThongKeDoanhThuAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default fetchThongKeDoanhThuSlice.reducer;
