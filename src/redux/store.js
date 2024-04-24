import { configureStore } from '@reduxjs/toolkit'
import fetchAllBenhNhanReducer from './slice/getDataSlice/getAllBenhNhanSlice'
import fetchAllBacSiReducer from './slice/getDataSlice/getAllBacSiSlice'
import fetchAllDichVuReducer from './slice/getDataSlice/getAllDichVuSlice'
import postAllDataDKKSlice from './slice/postDataSlice/postAllDataDKKSlice'


export default configureStore({
  reducer: {
    fetchAllBenhNhan: fetchAllBenhNhanReducer,
    fetchAllBacSi: fetchAllBacSiReducer,
    fetchAllDichVu: fetchAllDichVuReducer,
    postAllDataDDK: postAllDataDKKSlice,
  },
  devTools: true,
})