import { configureStore } from '@reduxjs/toolkit'
import fetchAllBenhNhanReducer from './slice/getDataSlice/getAllBenhNhanSlice'
import fetchAllBacSiReducer from './slice/getDataSlice/getAllBacSiSlice'
import fetchAllDichVuReducer from './slice/getDataSlice/getAllDichVuSlice'
import postAllDataDKKReducer from './slice/postDataSlice/postAllDataDKKSlice'
import getDSDKRecuder from './slice/getDataSlice/getDSDKSlice'
import selectedRowReducer from './slice/other/selectedRowSlice'



export default configureStore({
  reducer: {
    fetchAllBenhNhan: fetchAllBenhNhanReducer,
    fetchAllBacSi: fetchAllBacSiReducer,
    fetchAllDichVu: fetchAllDichVuReducer,
    fetchDSDK: getDSDKRecuder,
    selectedRow: selectedRowReducer
  },
  devTools: true,
})