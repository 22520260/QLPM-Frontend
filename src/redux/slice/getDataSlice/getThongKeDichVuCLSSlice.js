import { createSlice } from '@reduxjs/toolkit';
import { fetchThongKeDichVuCLSAction } from '../../action/fetchDataAction/fetchThongKeDichVuCLSAction';

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
      .addCase(fetchThongKeDichVuCLSAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchThongKeDichVuCLSAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchThongKeDichVuCLSAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default fetchThongKeDichVuSlice.reducer;
