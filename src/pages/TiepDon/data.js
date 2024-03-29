import DangKyKham from "./tabpages/DangKyKham";
import DanhSachDangKy from "./tabpages/DanhSachDangKy";

export const tabsDataTD = [
    { title: 'Đăng ký khám', content: 'tiepdon-dk', component: DangKyKham },
    { title: 'Danh sách đăng ký', content: 'tiepdon-ds', component: DanhSachDangKy },
    { title: 'Danh sách lịch hẹn', content: 'tiepdon-lich' },
];