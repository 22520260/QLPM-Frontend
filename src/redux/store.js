import { configureStore } from '@reduxjs/toolkit'
import fetchAllBenhNhanReducer from './slice/getDataSlice/getAllBenhNhanSlice'
import fetchAllBacSiReducer from './slice/getDataSlice/getAllBacSiSlice'
import fetchAllDichVuReducer from './slice/getDataSlice/getAllDichVuSlice'
import getDSDKRecuder from './slice/getDataSlice/getDSDKSlice'
import getCTDTByIdRecuder from './slice/getDataSlice/getCTDTByIdSlice'
import selectedRowReducer from './slice/other/selectedRowSlice'
import authReducer from './slice/other/authSlices'
import getAllAccountReducer from './slice/getDataSlice/getAllAccountSlice'
import getAllUserGroupReducer from './slice/getDataSlice/getAllUserGroupSlice'
import getAllLoaiDichVuReducer from './slice/getDataSlice/getAllLoaiDichVuSlice'
import getAllBenhReducer from './slice/getDataSlice/getAllBenhSlice'
import getAllDVTReducer from './slice/getDataSlice/getAllDVTSlice'
import getThamSoReducer from './slice/getDataSlice/getThamSoSlice'
import getAllRoleReducer from './slice/getDataSlice/getAllRoleSlice'
import getRoleByIdReducer from './slice/getDataSlice/getRoleByIdSlice'
import getAllThuocKeDonReducer from './slice/getDataSlice/getAllThuocKeDonSlice'
import getAllThuocReducer from './slice/getDataSlice/getAllThuocSlice'
import getAllLoThuocReducer from './slice/getDataSlice/getAllLoThuocSlice'


export default configureStore({
  reducer: {
    fetchAllBenhNhan: fetchAllBenhNhanReducer,
    fetchAllBacSi: fetchAllBacSiReducer,
    services: fetchAllDichVuReducer,
    thuoc: getAllThuocReducer,
    fetchDSDK: getDSDKRecuder,
    existedCTDT: getCTDTByIdRecuder,
    selectedRow: selectedRowReducer,
    auth: authReducer,
    account: getAllAccountReducer,
    groupUsers: getAllUserGroupReducer,
    loaiDichVu: getAllLoaiDichVuReducer,
    benh: getAllBenhReducer,
    dvt: getAllDVTReducer,
    thamso: getThamSoReducer,
    roles: getAllRoleReducer,
    roleById: getRoleByIdReducer,
    thuocKeDon: getAllThuocKeDonReducer,
    loThuoc: getAllLoThuocReducer,
  },
  devTools: true,
})
