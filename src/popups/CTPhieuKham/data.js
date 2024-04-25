import ThongTinKhachHang from './subTabs/TTKH';
import ThongTinKham from './subTabs/TTK'
import HoaDon from "./subTabs/HD";


export const tabsDataCTPK = [
    { title: 'Thông tin khách hàng', content: 'ctpk-ttkh', component: ThongTinKhachHang },
    { title: 'Thông tin khám', content: 'ctpk-ttk', component: ThongTinKham },
    { title: 'Hóa đơn', content: 'ctpk-hd', component: HoaDon },
];