import { createSlice } from '@reduxjs/toolkit';
import { fetchAllBenhNhanAction, fetchBenhNhanByIdAction } from '../../action/fetchDataAction/fetchAllBenhNhanAction';

const initialState = {
  patients: [],
  loading: false,
  error: null,
  patientById: {},
};

const fetchAllBenhNhanSlice = createSlice({
  name: 'patients',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllBenhNhanAction.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBenhNhanAction.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = action.payload.data;
      })
      .addCase(fetchAllBenhNhanAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchBenhNhanByIdAction.fulfilled, (state, action) => {
        state.loading = false;
        state.patientById = action.payload.data;
      });
  },
});

export default fetchAllBenhNhanSlice.reducer;
