import TiepDon from "../pages/TiepDon";
import KhamBenh from "../pages/KhamBenh";
import CanLamSang from "../pages/KhamBenh/CanLamSang";
import KhachHang from "../pages/KhachHang";
import Thuoc from "../pages/Thuoc";
import Start from "../pages/Start";
import Dashboard from "../pages/Dashboard";
import StartLayout from "../component/Layout/StartLayout";

const publicRoutes = [
    { path: '/tiepdon', component: TiepDon},

    { path: '/khambenh', component: KhamBenh},
    { path: '/khambenh/canlamsang', component: CanLamSang},
    
    { path: '/khachhang', component: KhachHang},

    { path: '/thuoc', component: Thuoc},

    { path: '/dashboard', component: Dashboard},

    { path: '', component: Start, layout: StartLayout},

]

export {publicRoutes};