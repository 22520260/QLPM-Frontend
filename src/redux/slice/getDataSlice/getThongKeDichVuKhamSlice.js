import { createSlice } from '@reduxjs/toolkit';
import { fetchThongKeDichVuKhamAction } from '../../action/fetchDataAction/fetchThongKeDichVuKhamAction';

const initialState = {
  data: [],
  isLoading: false,
};

const fetchThongKeDichVuSlice = createSlice({
  name: 'fetchThongKeDichVu',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchThongKeDichVuKhamAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchThongKeDichVuKhamAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchThongKeDichVuKhamAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default fetchThongKeDichVuSlice.reducer;
