import { configureStore } from '@reduxjs/toolkit'
import fetchAllBenhNhanReducer from './slice/getDataSlice/getAllBenhNhanSlice'
import fetchAllBacSiReducer from './slice/getDataSlice/getAllBacSiSlice'
import fetchAllDichVuReducer from './slice/getDataSlice/getAllDichVuSlice'
import fetchAllThuocReducer from './slice/getDataSlice/getAllThuocSlice'
import getDSDKRecuder from './slice/getDataSlice/getDSDKSlice'
import getCTDTByIdRecuder from './slice/getDataSlice/getCTDTByIdSlice'
import selectedRowReducer from './slice/other/selectedRowSlice'
import authReducer from './slice/other/authSlices'
// import persistedAuthSlice from '../redux/slice/other/authSlices';
import getAllUserInfoReducer from './slice/getDataSlice/getAllUserInfoSlice'

export default configureStore({
  reducer: {
    fetchAllBenhNhan: fetchAllBenhNhanReducer,
    fetchAllBacSi: fetchAllBacSiReducer,
    fetchAllDichVu: fetchAllDichVuReducer,
    fetchAllThuoc: fetchAllThuocReducer,
    fetchDSDK: getDSDKRecuder,
    existedCTDT: getCTDTByIdRecuder,
    selectedRow: selectedRowReducer,
    auth: authReducer,
    userInfo: getAllUserInfoReducer
  },
  devTools: true,
})

// export const persistor = persistStore(store);
