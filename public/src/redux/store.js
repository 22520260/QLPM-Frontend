import { configureStore } from '@reduxjs/toolkit'
import fetchAllBenhNhanReducer from './slice/getDataSlice/getAllBenhNhanSlice'
import fetchAllBacSiReducer from './slice/getDataSlice/getAllBacSiSlice'
import fetchAllDichVuReducer from './slice/getDataSlice/getAllDichVuSlice'
import fetchHoaDonReducer from './slice/getDataSlice/getHoaDonSlice' 
import getDSDKRecuder from './slice/getDataSlice/getDSDKSlice'
import getCTDTByIdRecuder from './slice/getDataSlice/getCTDTByIdSlice'
import getCLSRecuder from './slice/getDataSlice/getCLSSlice'
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
import getCheckThuocReducer from './slice/getDataSlice/getCheckThuocSlice'
import getTTKReducer from './slice/getDataSlice/getTTKSlice'
import getBenhByIdReducer from './slice/getDataSlice/getBenhByIdSlice'
import getThongKeDichVuKhamReducer from './slice/getDataSlice/getThongKeDichVuKhamSlice'
import getThongKeDichVuCLSReducer from './slice/getDataSlice/getThongKeDichVuCLSSlice'
import getThongKeBenhReducer from './slice/getDataSlice/getThongKeBenhSlice'
import getThongKeDoanhThuReducer from './slice/getDataSlice/getThongKeDoanhThuSlice'
import getThongKeChatLuongReducer from './slice/getDataSlice/getThongKeChatLuongSlice'
import getThongKeThuocReducer from './slice/getDataSlice/getThongKeThuocSlice'



export default configureStore({
  reducer: {
    fetchAllBenhNhan: fetchAllBenhNhanReducer,
    fetchAllBacSi: fetchAllBacSiReducer,
    services: fetchAllDichVuReducer,
    thuoc: getAllThuocReducer,
    fetchDSDK: getDSDKRecuder,
    fetchHoaDon: fetchHoaDonReducer,
    fetchCLS: getCLSRecuder,
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
    checkThuoc: getCheckThuocReducer,
    ttk: getTTKReducer,
    benhById: getBenhByIdReducer,
    tkDichVuKham: getThongKeDichVuKhamReducer,
    tkDichVuCLS: getThongKeDichVuCLSReducer,
    tkBenh: getThongKeBenhReducer,
    tkDoanhThu: getThongKeDoanhThuReducer,
    tkChatLuong: getThongKeChatLuongReducer,
    tkThuoc: getThongKeThuocReducer
  },
  devTools: true,
})
