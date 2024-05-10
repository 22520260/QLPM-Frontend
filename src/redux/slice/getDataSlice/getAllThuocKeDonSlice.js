import { createSlice } from '@reduxjs/toolkit';
import { fetchAllThuocKeDonAction } from '../../action/fetchDataAction/fetchAllThuocKeDonAction';

const initialState = {
  dsThuoc: [],
  loading: false,
  error: null,
};

const fetchAllThuocKeDonSlice = createSlice({
  name: 'dsThuoc',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllThuocKeDonAction.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllThuocKeDonAction.fulfilled, (state, action) => {
        state.loading = false;
        state.dsThuoc = action.payload.data;
      })
      .addCase(fetchAllThuocKeDonAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default fetchAllThuocKeDonSlice.reducer;
