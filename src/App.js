import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./component/Layout/DefaultLayout";
import { Fragment, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./helpers/authHelper";
import publicRoutes from "./routes/publicRoutes";
import privateRoutes from "./routes/privateRoutes";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAccountAction } from "./redux/action/fetchDataAction/fetchUserAccountAction";
import store from "./redux/store";
import io from "socket.io-client";
import { fetchDSDKAction } from "./redux/action/fetchDataAction/fetchDSDKAction";
import socket from "./setup/socket";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // socket.emit("send-message", {message: 'HELLO LO LO CC'});
    socket.on("receive-message", (data)=>{
      dispatch(fetchDSDKAction());
      // alert(data.message);
    })

    if (window.location.pathname !== "/login") {
      dispatch(fetchUserAccountAction());
    }
  }, []);

  const isLoading = useSelector((state) => state.auth?.isLoading);
  const user = useSelector((state) => state.auth?.user);
  console.log('user', user)

  return (
    <>
      <Router>
        {user && isLoading ? (
          <div className="modal-backdrop bg-secondary-subtle d-flex justify-content-center align-items-center">
            <div
              className="spinner-grow bg-primary"
              style={{ width: "5rem", height: "5rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div>
            <Routes>
              {publicRoutes.map((route, index) => {
                let Layout = DefaultLayout;
                if (route.layout) {
                  Layout = route.layout;
                }
                if (route.layout === null) {
                  Layout = Fragment;
                }
                const Page = route.component;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                );
              })}
              {privateRoutes.map((route, index) => {
                let Layout = DefaultLayout;
                if (route.layout) {
                  Layout = route.layout;
                }
                if (route.layout === null) {
                  Layout = Fragment;
                }
                const Page = route.component;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <PrivateRoute>
                        <Layout>
                          <Page />
                        </Layout>
                      </PrivateRoute>
                    }
                  />
                );
              })}
            </Routes>
          </div>
        )}
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
