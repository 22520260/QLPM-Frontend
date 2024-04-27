import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { publicRoutes } from "./routes";
import DefaultLayout from "./component/Layout/DefaultLayout";
import { Fragment, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [account, setAccount] = useState({});

  useEffect(() => {
    let session = sessionStorage.getItem('account');

    if(session) {
      setAccount(JSON.parse(session));
    }
  }, [])

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

// function App() {
//   return (
//     <div>
//       <div className="px-3 py-2 bg-primary">Dịch vụ</div>
//       <div className="py-3 border border-primary">
//         <div className="container-fluid mb-3">
//           <div className="row py-2">
//             <IFSearch
//               title={"Nhập dịch vụ"}
//               size={6}
//               onChange={(value) => {
//                 console.log("dichVu", value);
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default App;
