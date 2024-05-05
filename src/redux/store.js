import { configureStore } from '@reduxjs/toolkit'
import fetchAllBenhNhanReducer from './slice/getDataSlice/getAllBenhNhanSlice'
import fetchAllBacSiReducer from './slice/getDataSlice/getAllBacSiSlice'
import fetchAllDichVuReducer from './slice/getDataSlice/getAllDichVuSlice'
import getDSDKRecuder from './slice/getDataSlice/getDSDKSlice'
import selectedRowReducer from './slice/other/selectedRowSlice'
// import authReducer from './slice/other/authSlices'
import persistedAuthSlice from '../redux/slice/other/authSlices';


export default configureStore({
  reducer: {
    fetchAllBenhNhan: fetchAllBenhNhanReducer,
    fetchAllBacSi: fetchAllBacSiReducer,
    fetchAllDichVu: fetchAllDichVuReducer,
    fetchDSDK: getDSDKRecuder,
    selectedRow: selectedRowReducer,
    auth: persistedAuthSlice
  },
  devTools: true,
})

// export const persistor = persistStore(store);
