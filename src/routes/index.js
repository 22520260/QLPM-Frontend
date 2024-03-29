import TiepDon from "../pages/TiepDon";
import KhamBenh from "../pages/KhamBenh";
import KhachHang from "../pages/KhachHang";
import Start from "../pages/Start";
import StartLayout from "../component/Layout/StartLayout";

const publicRoutes = [
    { path: '/tiepdon', component: TiepDon},
    { path: '/khambenh', component: KhamBenh},
    { path: '/khachhang', component: KhachHang},
    { path: '', component: Start, layout: StartLayout},

]

export {publicRoutes};