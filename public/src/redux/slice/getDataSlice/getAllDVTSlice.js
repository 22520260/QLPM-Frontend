import { createSlice } from '@reduxjs/toolkit';
import { fetchAllDVTAction } from '../../action/fetchDataAction/fetchAllDVTAction';

const initialState = {
  data: [],
  isLoading: false,
};

const fetchAllDVTSlice = createSlice({
  name: 'donvitinh',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllDVTAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllDVTAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchAllDVTAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default fetchAllDVTSlice.reducer;
