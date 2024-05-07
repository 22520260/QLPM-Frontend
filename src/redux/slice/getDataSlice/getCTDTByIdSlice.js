import { createSlice } from '@reduxjs/toolkit';
import { fetchCTDTByIdAction } from '../../action/fetchDataAction/fetchCTDTById';

const initialState = {
  data: [],
  status: "",
  loading: false,
};

const fetchCTDTByIdSlice = createSlice({
  name: 'CTDT',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCTDTByIdAction.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(fetchCTDTByIdAction.fulfilled, (state, action) => {
        state.status = 'success';
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchCTDTByIdAction.rejected, (state) => {
        state.status = 'failed';
        state.loading = false;
      });
  },
});

export default fetchCTDTByIdSlice.reducer;
