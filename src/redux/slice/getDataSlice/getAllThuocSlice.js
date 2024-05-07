import { createSlice } from '@reduxjs/toolkit';
import { fetchAllThuocAction } from '../../action/fetchDataAction/fetchAllThuocAction';

const initialState = {
  dsThuoc: [],
  loading: false,
  error: null,
};

const fetchAllThuocSlice = createSlice({
  name: 'dsThuoc',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllThuocAction.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllThuocAction.fulfilled, (state, action) => {
        state.loading = false;
        state.dsThuoc = action.payload.data;
      })
      .addCase(fetchAllThuocAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default fetchAllThuocSlice.reducer;
