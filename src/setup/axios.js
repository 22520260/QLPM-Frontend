import axios from "axios";
import { toast } from "react-toastify";
import store from "../redux/store";
// import { useNavigate } from "react-router-dom";

//Create an instance of axios
const instance = axios.create({
  baseURL: "http://localhost:3001",
});

instance.defaults.withCredentials = true;

// instance.defaults.headers.common['Authorization'] = `Bearer ${store.getState().auth.user?.token}`

//Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const bearerToken = `Bearer ${store.getState().auth.user?.token}`;

    return {
      ...config,
      headers: {
        ...(bearerToken !== null && { Authorization: `${bearerToken}` }),
        ...config.headers,
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(">>> error", error);
    const status = error.response?.status || 500;

    switch (status) {
      case 401: {
        toast.error("Không xác thực người dùng. Vui lòng đăng nhập...");
        return error.response.data;
      }

      case 403: {
        toast.error("Bạn không có quyền truy cập vào tài nguyên này...");
        return error.response.data;
      }

      case 400: {
        toast.error("Bạn không có quyền truy cập vào tài nguyên này...");
        return error.response.data;      }

      case 404: {
        toast.error("Bạn không có quyền truy cập vào tài nguyên này...");
        return error.response.data;      }

      case 409: {
        toast.error("Bạn không có quyền truy cập vào tài nguyên này...");
        return error.response.data;      }

      case 422: {
        toast.error("Bạn không có quyền truy cập vào tài nguyên này...");
        return error.response.data;      }
      default: {
        toast.error("Lỗi ở server");
        return error.response.data;
      }
    }
  }
);

export default instance;
