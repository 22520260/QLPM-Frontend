import { createSlice } from '@reduxjs/toolkit';
import { fetchAllBacSiAction } from '../../action/fetchDataAction/fetchAllBacSiAction';

const initialState = {
  data: [],
  loading: false,
};

const fetchAllBacSiSlice = createSlice({
  name: 'fetchAllBacSi',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllBacSiAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllBacSiAction.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllBacSiAction.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default fetchAllBacSiSlice.reducer;
