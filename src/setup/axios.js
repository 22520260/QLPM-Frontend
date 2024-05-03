import axios from "axios";
import { toast } from "react-toastify";
import store from '../redux/store'

//Create an instance of axios
const instance = axios.create({
  baseURL: "http://localhost:3001",
});

instance.defaults.withCredentials = true;

// instance.defaults.headers.common['Authorization'] = `Bearer ${store.getState().auth.user?.token}`

//Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const bearerToken = `Bearer ${store.getState().auth.user?.token}`

    console.log('>>>bearerToken', bearerToken)
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
    console.log('>>> error', error)

    // const status = error.response?.status || 500;
    // console.log('>>> error.response.status', error.response.status)

    // console.log('>>> Status', status)
    // switch (status) {
    //   case 401: {
    //     toast.error("Unauthorized the user. Please login...");
    //     return error.response.data;
    //   }

    //   case 403: {
    //     toast.error(`You don't have permission to access this resourse...`);
    //     return Promise.reject(error);
    //   }

    //   case 400: {
    //     return Promise.reject(error);
    //   }

    //   case 404: {
    //     return Promise.reject(error);
    //   }

    //   case 409: {
    //     return Promise.reject(error);
    //   }

    //   case 422: {
    //     return Promise.reject(error);
    //   }
    //   default: {
        return Promise.reject(error);
    //   }
    // }
  }
);

export default instance;
