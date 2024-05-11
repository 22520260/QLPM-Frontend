import ThongTinKham from './subTabs/TTK';
import DichVu from './subTabs/DV'
import DonThuoc from "./subTabs/DT";
import LichSuKham from "./subTabs/LSK"
import LichSuThuoc from "./subTabs/LST"


export const tabsDataCTKB = [
    { title: 'Thông tin khám', content: 'ctpk-ttk', component: ThongTinKham },
    { title: 'Chỉ định CLS', content: 'ctpk-dv', component: DichVu },
    { title: 'Đơn thuốc', content: 'ctpk-dt', component: DonThuoc },
    { title: 'Lịch sử khám', content: 'ctpk-lsk', component: LichSuKham },
    { title: 'Lịch sử thuốc', content: 'ctpk-lst', component: LichSuThuoc },
];