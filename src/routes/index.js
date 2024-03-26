import TiepDon from "../pages/TiepDon";
import KhamBenh from "../pages/KhamBenh";
import KhachHang from "../pages/KhachHang";
import Start from "../pages/Start";

const publicRoutes = [
    { path: '/', component: TiepDon},
    { path: '/khambenh', component: KhamBenh},
    { path: '/khachhang', component: KhachHang},
    { path: '/start', component: Start, layout: null},

]

export {publicRoutes};