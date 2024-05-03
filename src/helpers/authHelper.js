import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const isLoading = useSelector((state) => state.auth.isLoading);
  const user = useSelector((state) => state.auth.user); // user chứa token, isAuthenticated, account
  console.log(">>>>>>>>> PRIVATE ROUTE", user);

  // Nếu đang loading, hiển thị spinner
  if (isLoading) {
    return (
      <div className="modal-backdrop bg-secondary-subtle d-flex justify-content-center align-items-center">
        <div
          className="spinner-grow bg-primary"
          style={{ width: "5rem", height: "5rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Nếu user không tồn tại hoặc chưa xác thực, điều hướng về trang login
  if (!user || !user.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Nếu user tồn tại và đã xác thực, render children
  return children;
};

export default PrivateRoute;
