import { createSlice } from '@reduxjs/toolkit';
import { fetchAllBenhNhanAction } from '../../action/fetchDataAction/fetchAllBenhNhanAction';

const initialState = {
  data: [],
  loading: false,
};

const fetchAllBenhNhanSlice = createSlice({
  name: 'patients',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllBenhNhanAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllBenhNhanAction.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllBenhNhanAction.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default fetchAllBenhNhanSlice.reducer;
