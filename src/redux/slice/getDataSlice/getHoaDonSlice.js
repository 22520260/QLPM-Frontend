import { createSlice } from '@reduxjs/toolkit';
import { fetchDSHDByIdAction } from '../../action/fetchDataAction/fetchHoaDonAction';

const initialState = {
  dshd: [],
  status: "",
  loading: false,
};

const fetchHoaDonSlice = createSlice({
  name: 'HoaDon',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDSHDByIdAction.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(fetchDSHDByIdAction.fulfilled, (state, action) => {
        state.status = 'success';
        state.loading = false;
        state.dshd = action.payload.data;
      })
      .addCase(fetchDSHDByIdAction.rejected, (state) => {
        state.status = 'failed';
        state.loading = false;
      });
  },
});

export default fetchHoaDonSlice.reducer;
