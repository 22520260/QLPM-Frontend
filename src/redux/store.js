import { configureStore } from '@reduxjs/toolkit'
import fetchAllBenhNhanReducer from './slice/getDataSlice/getAllBenhNhanSlice'
import fetchAllBacSiReducer from './slice/getDataSlice/getAllBacSiSlice'
import fetchAllDichVuReducer from './slice/getDataSlice/getAllDichVuSlice'
import postDataReducer from './slice/postDataSlice/postDataSlice'


export default configureStore({
  reducer: {
    fetchAllBenhNhan: fetchAllBenhNhanReducer,
    fetchAllBacSi: fetchAllBacSiReducer,
    fetchAllDichVu: fetchAllDichVuReducer,
    postData: postDataReducer,
  },
  devTools: true,
})