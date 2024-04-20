import { createSlice } from '@reduxjs/toolkit';
import { fetchAllBacSiAction } from '../../action/fetchDataAction/fetchAllBacSiAction';

const initialState = {
  doctors: [],
  loading: false,
  error: null,
};

const fetchAllBacSiSlice = createSlice({
  name: 'doctors',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllBacSiAction.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBacSiAction.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllBacSiAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default fetchAllBacSiSlice.reducer;
