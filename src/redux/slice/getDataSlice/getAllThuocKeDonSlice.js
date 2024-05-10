import { createSlice } from '@reduxjs/toolkit';
import { fetchAllThuocKeDonAction } from '../../action/fetchDataAction/fetchAllThuocKeDonAction';

const initialState = {
  dsThuoc: [],
  isLoading: false,
};

const fetchAllThuocKeDonSlice = createSlice({
  name: 'dsThuoc',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllThuocKeDonAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllThuocKeDonAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dsThuoc = action.payload.data;
      })
      .addCase(fetchAllThuocKeDonAction.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default fetchAllThuocKeDonSlice.reducer;
