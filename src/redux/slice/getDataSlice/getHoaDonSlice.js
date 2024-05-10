import { createSlice } from '@reduxjs/toolkit';
import { fetchDSHDByIdAction } from '../../action/fetchDataAction/fetchHoaDonAction';

const initialState = {
  dshd: [],
  status: "",
  loading: false,
  selectedHD: {},
};

const fetchHoaDonSlice = createSlice({
  name: 'HoaDon',
  initialState: initialState,
  reducers: {
    selectHD: (state, action) => {
      state.selectedHD = action.payload; // Cập nhật thông tin hàng được chọn
    },
    clearSelectedHD: (state) => {
      state.selectedHD = {}; // Xóa thông tin hàng được chọn
    },
  },
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

export const { selectHD, clearSelectedHD } = fetchHoaDonSlice.actions;

export default fetchHoaDonSlice.reducer;
