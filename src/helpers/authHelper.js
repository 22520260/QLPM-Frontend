import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const isAuthenticated = () => {
    // Kiểm tra trạng thái đăng nhập từ sessionStorage
    return !!sessionStorage.getItem('account');
}

const PrivateRoute = ({ children }) => {
    const auth = isAuthenticated(); 

    return auth ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
