import { createSlice } from '@reduxjs/toolkit';
import { fetchAllDichVuAction } from '../../action/fetchDataAction/fetchAllDichVuAction';

const initialState = {
  services: [],
  loading: false,
  error: null,
};

const fetchAllDichVuSlice = createSlice({
  name: 'services',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllDichVuAction.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDichVuAction.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllDichVuAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default fetchAllDichVuSlice.reducer;
