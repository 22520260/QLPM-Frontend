import DSTaiKhoan from "./tabpages/DSTaiKhoan";
import PhanQuyen from "./tabpages/PhanQuyen";
import QuyDinh from "./tabpages/QuyDinh";

export const tabsDataAdmin = [
    { title: 'Danh sách tài khoản', content: 'tiepdon-tk', component: DSTaiKhoan },
    { title: 'Phân quyền', content: 'tiepdon-pq', component: PhanQuyen },
    { title: 'Quy định', content: 'tiepdon-qd', component: QuyDinh },
];