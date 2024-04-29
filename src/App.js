import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./component/Layout/DefaultLayout";
import { Fragment} from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./helpers/authHelper";
import publicRoutes from "./routes/publicRoutes";
import privateRoutes from "./routes/privateRoutes";

function App() {

  return (
    <>
      <Router>
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
