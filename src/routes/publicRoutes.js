// publicRoutes.js
import Login from "../pages/Login";
import InOutLayout from "../component/Layout/InOutLayout";
import ForgotPass from "../pages/ForgotPass";

const publicRoutes = [
    { path: '/login', component: Login, layout: InOutLayout},
    { path: '/login/quenmatkhau', component: ForgotPass, layout: InOutLayout}
];

export default publicRoutes;
